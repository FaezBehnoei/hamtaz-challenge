<script setup>
defineProps({
  show: Boolean
})
defineEmits(['close'])
</script>

<template>
  <div
    v-if="show"
    @click.self="$emit('close')"
    class="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6 space-y-4 transition-transform transform scale-100">
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-bold text-gray-800">
          <slot name="header">عنوان پیش‌فرض</slot>
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>

      <div class="py-4">
        <slot name="body">محتوای پیش‌فرض مودال.</slot>
      </div>

      <div class="flex justify-end space-x-2 space-x-reverse border-t pt-4">
        <slot name="footer">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-200 rounded">بستن</button>
        </slot>
      </div>
    </div>
  </div>
</template>