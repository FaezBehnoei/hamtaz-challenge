<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  icon: String,
  inputId: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` },
  rules: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue', 'icon-click'])

const errorMessage = ref('')
const hasError = ref(false)

function validate() {
  hasError.value = false
  errorMessage.value = ''
  for (const rule of props.rules) {
    const result = rule(props.modelValue || '')
    if (result !== true) {
      hasError.value = true
      errorMessage.value = result
      return false
    }
  }
  return true
}

function handleInput(event) {
  emit('update:modelValue', event.target.value)
  if (hasError.value) {
    hasError.value = false
    errorMessage.value = ''
  }
}

defineExpose({ validate })
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        @input="handleInput"
        @blur="validate"
        :placeholder="placeholder"
        class="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-1 text-gray-800"
        :class="{
          'border-gray-300 focus:ring-gray-400 focus:border-gray-400': !hasError,
          'border-red-500 focus:ring-red-500 focus:border-red-500': hasError,
          'pl-10': icon
        }"
      />
      <div v-if="icon" @click="$emit('icon-click')" class="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
        <Icon 
          :icon="icon === 'eye' ? 'heroicons:eye' : 'heroicons:eye-slash'" 
          class="h-5 w-5 text-gray-400" 
        />
      </div>
    </div>
    <p v-if="hasError" class="text-red-600 text-xs mt-1">{{ errorMessage }}</p>
  </div>
</template>