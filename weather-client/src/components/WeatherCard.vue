<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md text-center">
  <h2 class="text-2xl font-semibold mb-2">Delhi</h2>
  <img src="https://openweathermap.org/img/wn/01d@2x.png" class="mx-auto w-20" alt="weather icon">
  <p class="text-4xl font-bold mt-2">32°C</p>
  <p class="text-lg text-gray-600">Clear Sky</p>
</div>
</template>

<script setup>
const props = defineProps({
  weather: Object,
})

const iconUrl = computed(() =>
  weather && weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : ''
)
</script>
