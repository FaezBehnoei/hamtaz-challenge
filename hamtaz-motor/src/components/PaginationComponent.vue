<script setup>
import Icon from './Icon.vue';

defineProps({
  currentPage: Number,
  totalPages: Number,
  prev: Function,
  next: Function,
  goTo: Function
})
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center space-x-1 space-x-reverse my-8">
    <!-- Previous Button -->
    <button 
      @click="prev" 
      :disabled="currentPage === 1" 
      class="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
      :class="{
        'text-gray-400 cursor-not-allowed': currentPage === 1,
        'text-gray-600 hover:bg-gray-200': currentPage !== 1
      }"
    >
      <Icon icon="heroicons:chevron-right-20-solid" class="w-5 h-5" />
    </button>

    <!-- Page Number Buttons -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goTo(page)"
      class="w-10 h-10 rounded-full font-medium transition-colors duration-200"
      :class="[
        currentPage === page 
          ? 'bg-red-500 text-white shadow-md' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      ]"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button 
      @click="next" 
      :disabled="currentPage === totalPages" 
      class="flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
      :class="{
        'text-gray-400 cursor-not-allowed': currentPage === totalPages,
        'text-gray-600 hover:bg-gray-200': currentPage !== totalPages
      }"
    >
      <Icon icon="heroicons:chevron-left-20-solid" class="w-5 h-5" />
    </button>
  </div>
</template>
