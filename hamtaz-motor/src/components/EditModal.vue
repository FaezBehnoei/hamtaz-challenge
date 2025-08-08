<script setup>
import { ref, watch } from 'vue'
import ModalComponent from './ModalComponent.vue'
import InputComponent from './InputComponent.vue'
import ButtonComponent from './ButtonComponent.vue'
import { translationMap } from '../utils/translations.js'

const props = defineProps({
  show: Boolean,
  item: Object
})

const emit = defineEmits(['close', 'update'])

const editableData = ref(null)
const itemName = ref('')

watch(() => props.item, (newItem) => {
  if (newItem && newItem.data) {
    editableData.value = JSON.parse(JSON.stringify(newItem.data))
    itemName.value = newItem.name
  } else {
    editableData.value = null
    itemName.value = newItem ? newItem.name : ''
  }
})

function translateKey(key) {
  return translationMap[key] || key
}

function submitChanges() {
  emit('update', { id: props.item.id, newData: editableData.value })
}
</script>

<template>
  <ModalComponent :show="show" @close="$emit('close')">
    <template #header>
      ویرایش آیتم: {{ itemName }}
    </template>
    
    <template #body>
      <form v-if="editableData" class="space-y-4">
        <InputComponent
          v-for="(value, key) in editableData"
          :key="key"
          :label="translateKey(key)"
          :modelValue="String(value)"
          @update:modelValue="editableData[key] = $event"
        />
      </form>
      <p v-else class="text-gray-500">اطلاعاتی برای ویرایش وجود ندارد.</p>
    </template>

    <template #footer>
      <div class="w-full flex space-x-4">
        <ButtonComponent 
          label="لغو" 
          type="secondary" 
          @click="$emit('close')" 
        />
        <ButtonComponent 
          label="ذخیره تغییرات" 
          type="primary" 
          @click="submitChanges" 
        />
      </div>
    </template>
  </ModalComponent>
</template>
