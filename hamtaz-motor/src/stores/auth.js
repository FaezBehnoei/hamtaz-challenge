import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const isAuthenticated = computed(() => !!user.value)

  function register(credentials) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const userExists = users.some(u => u.username === credentials.username)
    if (userExists) {
      toast.error('این نام کاربری قبلاً استفاده شده است.')
      return false
    }
    users.push(credentials)
    localStorage.setItem('users', JSON.stringify(users))
    toast.success('ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.')
    return true
  }

  function login(credentials) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const foundUser = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    )
    if (foundUser) {
      user.value = foundUser
      localStorage.setItem('user', JSON.stringify(foundUser))
      toast.success(`خوش آمدید, ${foundUser.username}!`)
      router.push('/')
    } else {
      toast.error('نام کاربری یا رمز عبور اشتباه است.')
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  return { user, isAuthenticated, register, login, logout }
})