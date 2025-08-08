<script setup>
defineProps({
  label: String,
  disable: Boolean,
  loading: Boolean,
  htmlType: { type: String, default: 'button' },
  // 'primary' (red) or 'secondary' (gray)
  type: { type: String, default: 'primary' },
})
defineEmits(['click'])
</script>

<template>
  <button
    :disabled="disable || loading"
    :type="htmlType"
    @click="$emit('click')"
    class="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
    :class="[
      type === 'primary' ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      (disable || loading) ? 'opacity-50 cursor-not-allowed' : ''
    ]"
  >
    <div v-if="loading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
    <span v-else>{{ label }}</span>
  </button>
</template>
