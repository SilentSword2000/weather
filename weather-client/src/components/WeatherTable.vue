<template>
  <div class="overflow-x-auto">
  <table class="min-w-full table-auto border-collapse border border-gray-200 mt-4">
    <thead class="bg-gray-100">
      <tr>
        <th class="border px-4 py-2">Location</th>
        <th class="border px-4 py-2">Date</th>
        <th class="border px-4 py-2">Temperature</th>
        <th class="border px-4 py-2">Condition</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in weatherHistory" :key="item._id">
        <td class="border px-4 py-2">{{ item.location }}</td>
        <td class="border px-4 py-2">{{ item.date }}</td>
        <td class="border px-4 py-2">{{ item.temp }}°C</td>
        <td class="border px-4 py-2 capitalize">{{ item.condition }}</td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script setup>
const props = defineProps({
  history: Array,
})
</script>
