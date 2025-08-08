<script setup>
import { formatNumber } from '@/utils/format.js';
import { translationMap } from '../utils/translations.js';
import { RouterLink } from 'vue-router';


const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit', 'delete']);

function translateKey(key) {
  return translationMap[key] || key;
}

// Emit events to the parent, stopping the RouterLink navigation
function onEditClick(event) {
  event.preventDefault();
  emit('edit', props.item);
}

function onDeleteClick(event) {
  event.preventDefault();
  emit('delete', props.item.id);
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-shadow hover:shadow-xl">
    <!-- Image Placeholder -->
    <RouterLink :to="`/item/${item.id}`" class="block">
      <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-400">Image</span>
      </div>
    </RouterLink>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-bold text-gray-800 mb-2 h-14 overflow-hidden">
        {{ item.name }}
      </h3>
      
      <!-- Dynamic Data -->
      <div class="text-xs text-gray-600 space-y-1 mb-4 flex-grow">
        <div v-if="!item.data" class="text-gray-400 italic">دیتای اضافی وجود ندارد</div>
        <div v-else v-for="(value, key) in item.data" :key="key" class="flex justify-between">
          <strong class="font-semibold">{{ translateKey(key) }}:</strong>
          <span v-if="key === 'price'">{{ formatNumber(value) }}</span>
          <span v-else>{{ value }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-auto pt-4 border-t border-gray-100 flex space-x-2">
        <button
          @click="onEditClick"
          class="w-full text-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ویرایش
        </button>
        <button
          @click="onDeleteClick"
          class="w-full text-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
        >
          حذف
        </button>
      </div>
    </div>
  </div>
</template>
