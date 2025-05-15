<template>
  <div>
    <WeatherForm @fetchWeather="fetchWeatherData" />
    <WeatherHistoryTable :weatherHistory="weatherHistory" />
  </div>
</template>

<script setup>
import WeatherForm from '@/components/WeatherForm.vue'
import WeatherHistoryTable from '@/components/WeatherHistoryTable.vue'
import { ref } from 'vue'

const weatherHistory = ref([])

function fetchWeatherData(filters) {
  // Fetch from backend or API and set weatherHistory.value = result
}
</script>
