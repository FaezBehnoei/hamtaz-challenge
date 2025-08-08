<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import { useAuthStore } from '../stores/auth.js'
import { rules } from '../utils/rules.js'

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const authStore = useAuthStore()
const usernameInput = ref(null)
const passwordInput = ref(null)

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'))
const passwordIcon = computed(() => (showPassword.value ? 'close-eye' : 'eye'))

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  const isUsernameValid = usernameInput.value.validate()
  const isPasswordValid = passwordInput.value.validate()

  if (!isUsernameValid || !isPasswordValid) {
    return
  }
  
  authStore.login({
    username: username.value,
    password: password.value
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-800">
          ورود | ثبت‌نام
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          سلام! لطفاً اطلاعات خود را وارد کنید.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <InputComponent
          ref="usernameInput"
          v-model="username"
          placeholder="نام کاربری"
          :rules="[rules.required]"
        />
        <InputComponent
          ref="passwordInput"
          v-model="password"
          placeholder="رمز عبور"
          :type="passwordFieldType"
          :icon="passwordIcon"
          @icon-click="togglePasswordVisibility"
          :rules="[rules.required]"
        />
        <div class="pt-2">
          <ButtonComponent
            label="ورود"
            html-type="submit"
          />
        </div>
        <p class="text-center text-xs text-gray-500 pt-4">
          حساب کاربری ندارید؟
          <RouterLink to="/auth/register" class="font-medium text-red-500 hover:underline">
            ثبت نام کنید
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>