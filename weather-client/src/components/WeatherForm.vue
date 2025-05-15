<template>
  <div class="p-4 bg-white rounded-lg shadow max-w-4xl mx-auto">
    <h2 class="text-lg font-bold mb-4">Check Weather History</h2>
    <form @submit.prevent="submit" class="space-y-4 md:space-y-0 md:flex md:items-end md:gap-6">
      <div class="flex-1 min-w-[150px]">
        <label class="block mb-1 font-semibold" for="location">Location</label>
        <select
          id="location"
          v-model="location"
          class="border rounded p-2 w-full"
          required
        >
          <option disabled value="">Select</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div class="flex-1 min-w-[150px]">
        <label class="block mb-1 font-semibold" for="fromDate">From</label>
        <input
          id="fromDate"
          type="date"
          v-model="fromDate"
          :max="maxToDate"
          class="border rounded p-2 w-full"
          required
          @change="validateDates"
        />
      </div>

      <div class="flex-1 min-w-[150px]">
        <label class="block mb-1 font-semibold" for="toDate">To</label>
        <input
          id="toDate"
          type="date"
          v-model="toDate"
          :min="fromDate"
          :max="maxToday"
          class="border rounded p-2 w-full"
          required
          @change="validateDates"
        />
      </div>

      <button
        type="submit"
        :disabled="!isValid"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Fetch
      </button>
    </form>
    <p v-if="dateError" class="text-red-600 mt-2 text-sm">{{ dateError }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['fetchWeather'])

const cities = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh']
const location = ref('')
const fromDate = ref('')
const toDate = ref('')
const dateError = ref('')

// Maximum date allowed is today
const maxToday = new Date().toISOString().split('T')[0]

// Max range allowed is 30 days from fromDate
const maxToDate = computed(() => {
  if (!fromDate.value) return maxToday
  const from = new Date(fromDate.value)
  from.setDate(from.getDate() + 30)
  const maxDate = from <= new Date(maxToday) ? from : new Date(maxToday)
  return maxDate.toISOString().split('T')[0]
})

// Validate date range
function validateDates() {
  dateError.value = ''
  if (fromDate.value && toDate.value) {
    const from = new Date(fromDate.value)
    const to = new Date(toDate.value)
    if (to < from) {
      dateError.value = "'To' date cannot be before 'From' date."
    } else if (to - from > 30 * 24 * 60 * 60 * 1000) {
      dateError.value = "Date range cannot exceed 30 days."
    }
  }
}

const isValid = computed(() => {
  return (
    location.value &&
    fromDate.value &&
    toDate.value &&
    !dateError.value
  )
})

function submit() {
  if (!isValid.value) return
  emit('fetchWeather', {
    location: location.value,
    fromDate: fromDate.value,
    toDate: toDate.value,
  })
}
</script>
