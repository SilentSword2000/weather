<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-8">
    <div class="max-w-4xl mx-auto p-4">
      <!-- App Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-indigo-800 mb-2">Weather Forecast</h1>
        <p class="text-gray-600">Get current weather and historical data</p>
      </div>
    
      <!-- Current Weather Card -->
      <section class="bg-white p-6 rounded-xl shadow-lg mb-8 border border-indigo-100">
        <h2 class="text-2xl font-semibold mb-6 text-indigo-700 text-center">Current Weather</h2>

        <!-- Fetch form -->
        <form @submit.prevent="getWeather" class="flex flex-wrap gap-4 justify-center mb-6">
          <select
            v-model="city"
            required
            class="border border-indigo-200 rounded-lg px-4 py-2 w-48 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
          >
            <option disabled value="">Select a city</option>
            <option v-for="place in places" :key="place" :value="place">{{ place }}</option>
          </select>

          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all hover:shadow-md transform hover:-translate-y-px"
          >
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
              </svg>
              Get Weather
            </span>
          </button>
        </form>

        <!-- Display current weather -->
        <div 
          v-if="weather" 
          class="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-inner flex flex-col items-center transition-all duration-300 ease-in-out"
        >
          <div class="flex flex-col md:flex-row items-center justify-center w-full">
            <div class="flex flex-col items-center md:w-1/2">
              <img
                :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
                :alt="weather.weather[0].description"
                class="w-32 h-32"
              />
              <p class="capitalize text-lg text-indigo-800 font-medium">{{ weather.weather[0].description }}</p>
            </div>
            
            <div class="flex flex-col items-center md:items-start md:w-1/2 mt-4 md:mt-0">
              <h2 class="text-3xl font-bold text-indigo-900">{{ weather.name }}</h2>
              <p class="text-5xl font-bold mt-2 text-indigo-800">{{ Math.round(weather.main.temp) }}°C</p>
              <div class="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-gray-600">
                <p>Humidity: {{ weather.main.humidity }}%</p>
                <p>Wind: {{ Math.round(weather.wind.speed) }} m/s</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading and error states -->
        <div v-else-if="loading" class="mt-6 p-4 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p class="mt-2 text-indigo-600">Loading weather data...</p>
        </div>
        <p v-else-if="error" class="text-red-600 text-center mt-4 p-2 bg-red-50 rounded-lg">{{ error }}</p>
      </section>

      <!-- Weather History Card -->
      <section class="bg-white p-6 rounded-xl shadow-lg border border-indigo-100">
        <h2 class="text-2xl font-semibold mb-6 text-indigo-700 text-center">Weather History</h2>

        <!-- Filters form -->
        <form @submit.prevent="fetchHistory" class="flex flex-wrap gap-4 justify-center mb-6">
          <select 
            v-model="filterLocation" 
            class="border border-indigo-200 rounded-lg px-4 py-2 w-48 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition" 
            required
          >
            <option disabled value="">Select location</option>
            <option v-for="city in filterCities" :key="city" :value="city">{{ city }}</option>
          </select>
          
          <div class="flex flex-col w-full md:w-auto">
            <label class="text-xs text-gray-500 mb-1 ml-1">From</label>
            <input
              type="date"
              v-model="fromDate"
              :max="maxDate"
              class="border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
              required
              @change="validateDates"
            />
          </div>
          
          <div class="flex flex-col w-full md:w-auto">
            <label class="text-xs text-gray-500 mb-1 ml-1">To</label>
            <input
              type="date"
              v-model="toDate"
              :min="fromDate"
              :max="maxDate"
              class="border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 focus:outline-none transition"
              required
              @change="validateDates"
            />
          </div>
          
          <button
            type="submit"
            :disabled="!isDateRangeValid"
            class="bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all hover:shadow-md transform hover:-translate-y-px hover:bg-indigo-700 disabled:hover:transform-none disabled:hover:shadow disabled:cursor-not-allowed"
          >
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fetch History
            </span>
          </button>
        </form>

        <p v-if="dateError" class="text-red-600 text-center mb-4 p-2 bg-red-50 rounded-lg">{{ dateError }}</p>

        <!-- History Table -->
        <div class="overflow-x-auto rounded-lg shadow">
          <table class="min-w-full border-collapse">
            <thead class="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Temperature (°C)</th>
                <th class="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Condition</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-indigo-100">
              <tr v-for="item in weatherHistory" :key="item._id" class="hover:bg-indigo-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">{{ item.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                <td class="px-6 py-4 whitespace-nowrap font-medium">{{ item.temp }}°C</td>
                <td class="px-6 py-4 whitespace-nowrap capitalize">
                  <span class="px-2 py-1 rounded-full text-xs font-medium" 
                    :class="{
                      'bg-yellow-100 text-yellow-800': item.condition.includes('sun') || item.condition.includes('clear'),
                      'bg-blue-100 text-blue-800': item.condition.includes('rain') || item.condition.includes('drizzle'),
                      'bg-gray-100 text-gray-800': item.condition.includes('cloud') || item.condition.includes('mist'),
                      'bg-indigo-100 text-indigo-800': !item.condition.includes('sun') && !item.condition.includes('clear') && !item.condition.includes('rain') && !item.condition.includes('cloud')
                    }">
                    {{ item.condition }}
                  </span>
                </td>
              </tr>
              <tr v-if="weatherHistory.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-500 italic bg-gray-50">No data found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      <!-- Footer -->
      <footer class="mt-8 text-center text-gray-500 text-sm">
        <p>Weather data provided by OpenWeather API</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const places = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh']

// Current weather fetch
const city = ref('')
const weather = ref(null)
const error = ref('')
const loading = ref(false)

const getWeather = async () => {
  error.value = ''
  weather.value = null
  if (!city.value) return
  
  loading.value = true
  
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
    if (!res.ok) throw new Error('Failed to fetch weather')
    weather.value = await res.json()
  } catch (err) {
    error.value = err.message || 'Error fetching weather'
  } finally {
    loading.value = false
  }
}

// History filters and data
const filterCities = places
const filterLocation = ref('')
const fromDate = ref('')
const toDate = ref('')
const dateError = ref('')
const weatherHistory = ref([])

const maxDate = new Date().toISOString().split('T')[0]

const isDateRangeValid = computed(() => {
  if (!fromDate.value || !toDate.value) return false
  const from = new Date(fromDate.value)
  const to = new Date(toDate.value)
  if (to < from) return false
  if ((to - from) / (1000 * 60 * 60 * 24) > 30) return false
  return true
})

function validateDates() {
  dateError.value = ''
  if (!isDateRangeValid.value) {
    dateError.value = "Invalid date range: max 30 days, 'To' date must be after 'From' date"
  }
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Fetch history stub — replace with actual API call
const fetchHistory = async () => {
  if (!isDateRangeValid.value || !filterLocation.value) return
  
  // Simulate fetch - replace with real call to backend GraphQL API
  weatherHistory.value = [
    {
      _id: 1,
      location: filterLocation.value,
      date: fromDate.value,
      temp: 28,
      condition: 'clear sky',
    },
    {
      _id: 2,
      location: filterLocation.value,
      date: toDate.value,
      temp: 30,
      condition: 'sunny',
    },
    {
      _id: 3,
      location: filterLocation.value,
      date: new Date(new Date(fromDate.value).getTime() + 86400000).toISOString().split('T')[0],
      temp: 26,
      condition: 'cloudy',
    },
    {
      _id: 4,
      location: filterLocation.value,
      date: new Date(new Date(fromDate.value).getTime() + 172800000).toISOString().split('T')[0],
      temp: 25,
      condition: 'light rain',
    }
  ]
}
</script>

<style>
body {
  font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>