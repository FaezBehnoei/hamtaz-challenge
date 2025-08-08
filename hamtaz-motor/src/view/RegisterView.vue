<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import { useAuthStore } from '../stores/auth.js'
import { rules } from '../utils/rules.js'

const username = ref('')
const password = ref('')
const retypePassword = ref('')
const authStore = useAuthStore()
const router = useRouter()

const showPassword = ref(false)
const usernameInput = ref(null)
const passwordInput = ref(null)

const retypePasswordError = ref('')

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'))
const passwordIcon = computed(() => (showPassword.value ? 'eye' : 'close-eye'))

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function validatePasswordMatch() {
  if (retypePassword.value && password.value !== retypePassword.value) {
    retypePasswordError.value = 'رمزهای عبور با هم مطابقت ندارند.'
    return false
  }
  retypePasswordError.value = ''
  return true
}

watch([password, retypePassword], () => {
  if (retypePassword.value) {
    validatePasswordMatch()
  }
})

const isFormValid = computed(() => {
  const isUsernameValid = rules.required(username.value) === true;
  const isPasswordValid = rules.minLength(8)(password.value) === true && rules.hasLetterAndNumber(password.value) === true;
  const passwordsMatch = password.value === retypePassword.value;
  
  return isUsernameValid && isPasswordValid && passwordsMatch && retypePassword.value !== ''
})

function handleRegister() {
  const isUsernameValid = usernameInput.value.validate()
  const isPasswordValid = passwordInput.value.validate()
  const passwordsMatch = validatePasswordMatch()

  if (!isUsernameValid || !isPasswordValid || !passwordsMatch) {
    return
  }

  const success = authStore.register({
    username: username.value,
    password: password.value
  })

  if (success) {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
      
      <div class="text-center">
        <h2 class="text-xl font-bold text-gray-800">
          ثبت‌نام
        </h2>
        <p class="mt-2 text-sm text-gray-500">
          سلام! لطفاً اطلاعات خود را وارد کنید.
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleRegister">
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
          :rules="[rules.required, rules.minLength(8), rules.hasLetterAndNumber]"
        />
        <div>
          <InputComponent
            v-model="retypePassword"
            placeholder="تکرار رمز عبور"
            type="password"
            @blur="validatePasswordMatch"
          />
          <p v-if="retypePasswordError" class="text-red-600 text-xs mt-1">{{ retypePasswordError }}</p>
        </div>
        <div class="pt-2">
          <ButtonComponent
            label="ثبت نام"
            html-type="submit"
            :disable="!isFormValid"
          />
        </div>
        <p class="text-center text-xs text-gray-500 pt-4">
          حساب کاربری دارید؟
          <RouterLink to="/auth/login" class="font-medium text-red-500 hover:underline">
            وارد شوید
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>