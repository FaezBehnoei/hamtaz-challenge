<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const price = computed(() => {
  if (props.item.data) {
    // Price or price keys might be capitalized differently
    const priceKey = Object.keys(props.item.data).find(key => key.toLowerCase() === 'price');
    if (priceKey) {
      return new Intl.NumberFormat('fa-IR').format(props.item.data[priceKey]);
    }
  }
  return null;
});
</script>

<template>
  <RouterLink
    :to="`/item/${item.id}`"
    class="flex-shrink-0 w-48 block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
  >
    <div class="w-full h-32 mb-3 flex items-center justify-center">
      <div class="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
        <span class="text-gray-400 text-xs">Image</span>
      </div>
    </div>
    <p class="text-sm font-medium text-gray-800 h-10 overflow-hidden text-ellipsis">
      {{ item.name }}
    </p>
      
    <div class="flex justify-between items-center" v-if="price">
    <span class="text-xs text-gray-500 mr-1">قیمت : </span>
     <div class=" text-left">
         <span class="text-lg font-bold text-gray-900">{{ price }}</span>
        <span class="text-xs text-gray-500 mr-1">تومان</span>
     </div>
    </div>
    <div v-else class="mt-4 text-left h-8">
      </div>
  </RouterLink>
</template>