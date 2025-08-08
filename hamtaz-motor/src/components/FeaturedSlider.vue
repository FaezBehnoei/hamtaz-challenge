<script setup>
import { ref, onMounted } from 'vue'
import { getObjectsByIds } from '../services/objectService'
import SliderCard from './SliderCard.vue'; 

const featuredItems = ref([])
const isLoading = ref(true)
const featuredIds = ['1', '7', '13', '5', '9', '4', '6']

onMounted(async () => {
  try {
    const response = await getObjectsByIds(featuredIds)
    featuredItems.value = response.data
  } catch (error) {
    console.error("خطا در دریافت آیتم‌های ویژه:", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="mb-12">
    <div class="bg-red-500 rounded-2xl flex p-4">

      <div class="flex-shrink-0 w-40 text-center text-white flex flex-col justify-center items-center">
        <h3 class="text-2xl font-bold">پیشنهاد</h3>
        <h3 class="text-2xl font-bold">شگفت‌انگیز</h3>
      </div>

      <div class="flex-grow overflow-hidden">
        <div v-if="isLoading" class="text-center text-white">درحال بارگذاری...</div>
        
        <div v-else class="flex justify-between space-x-1 overflow-x-auto  pb-2 -mb-2 custom-scrollbar">
          <SliderCard 
            v-for="item in featuredItems"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for a cleaner look */
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
}
</style>