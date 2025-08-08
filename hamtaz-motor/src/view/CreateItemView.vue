<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useObjectStore } from '../stores/objectStore'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const objectStore = useObjectStore()
const router = useRouter()

const name = ref('')
const price = ref('')
const color = ref('')

const nameError = ref('')
const priceError = ref('')

function validateForm() {
  let isValid = true
  nameError.value = ''
  priceError.value = ''

  if (!name.value.trim()) {
    nameError.value = 'وارد کردن عنوان الزامی است.'
    isValid = false
  }

  if (!price.value || isNaN(Number(price.value))) {
    priceError.value = 'لطفاً یک قیمت معتبر وارد کنید.'
    isValid = false
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  const newItemData = {
    name: name.value,
    details: {
      price: Number(price.value),
      color: color.value,
    }
  }

  const newItem = await objectStore.createObject(newItemData)
    if (newItem) {
    router.push(`/item/${newItem.id}`)
    }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">ساخت آیتم جدید</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-6 rounded-lg shadow-md">
      
      <div>
        <InputComponent v-model="name" label="عنوان (Name)" placeholder="نام آیتم را وارد کنید" />
        <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
      </div>

      <div>
        <InputComponent v-model="price" label="قیمت" placeholder="مثال: 499.99" />
        <p v-if="priceError" class="text-red-500 text-sm mt-1">{{ priceError }}</p>
      </div>

      <div>
        <InputComponent v-model="color" label="رنگ" placeholder="مثال: مشکی" />
      </div>

      <div>
        <ButtonComponent
          label="ساخت آیتم"
          html-type="submit"
          :loading="objectStore.isLoading"
        />
      </div>
    </form>
  </div>
</template>