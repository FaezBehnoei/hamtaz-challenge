<script setup>
import ModalComponent from './ModalComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import Icon from './Icon.vue';

defineProps({
  show: Boolean
})
defineEmits(['close', 'confirm'])
</script>

<template>
  <ModalComponent :show="show" @close="$emit('close')">
    <template #header>
      <div class="flex items-center">
        <Icon icon="heroicons:exclamation-triangle-20-solid" class="h-6 w-6 text-red-500 ml-2" />
        <span>تایید عملیات حذف</span>
      </div>
    </template>
    
    <template #body>
      <p class="text-base text-gray-600">
        آیا از حذف این آیتم اطمینان دارید؟ این عمل غیرقابل بازگشت است.
      </p>
    </template>
    
    <template #footer>
      <div class="w-full flex space-x-4 ">
        <ButtonComponent 
          label="لغو" 
          type="secondary" 
          @click="$emit('close')" 
        />
        <ButtonComponent 
          label="بله، حذف کن" 
          type="primary" 
          @click="$emit('confirm')" 
        />
      </div>
    </template>
  </ModalComponent>
</template>
