import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getObjects, deleteObject, updateObject, createObject, getObjectById } from '../services/objectService.js' // Corrected path
import { useToast } from 'vue-toastification'
import router from '@/router/index.js'

const toast = useToast()

export const useObjectStore = defineStore('objects', () => {
  const objects = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentObject = ref(null)

    async function fetchObjects() {
    isLoading.value = true
    error.value = null
    try {
      const response = await getObjects()
      objects.value = response.data
    } catch (err) {
      error.value = 'خطا در دریافت اطلاعات از سرور.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }
  async function removeObject(id) {
    try {
      await deleteObject(id)
      objects.value = objects.value.filter(obj => obj.id !== id)
      toast.success('آیتم با موفقیت حذف شد.')
      router.push('/')
    } catch (err) {
      // --- جایگزین alert ---
      toast.error('خطا در حذف آیتم.')
      console.error(err)
    }
  }

  async function editObject(updatedItem) {
    try {
      const response = await updateObject(updatedItem.id, updatedItem.newData)
      const index = objects.value.findIndex(obj => obj.id === updatedItem.id)
      if (index !== -1) {
        objects.value[index].data = response.data.data
      }
      // --- جایگزین alert ---
      toast.success('آیتم با موفقیت ویرایش شد.')
    } catch (err) {
      // --- جایگزین alert ---
      toast.error('خطا در ویرایش آیتم.')
      console.error(err)
    }
  }
  
  async function addObject(itemData) {
    isLoading.value = true
    error.value = null
    try {
      const response = await createObject(itemData)
      objects.value.unshift(response.data)
      // --- جایگزین alert ---
      toast.success('آیتم با موفقیت ساخته شد!')
      return response.data
    } catch (err) {
      error.value = 'خطا در ساخت آیتم جدید.'
      // --- جایگزین alert ---
      toast.error(error.value)
      console.error(err)
      return false
    } finally {
      isLoading.value = false
    }
  }
  async function fetchObjectById(id) {
    isLoading.value = true
    error.value = null
    currentObject.value = null 
    try {
      const response = await getObjectById(id)
      currentObject.value = response.data
    } catch (err) {
      error.value = 'خطا در دریافت جزئیات آیتم.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }


  return { objects, isLoading, error, currentObject, fetchObjects, removeObject, editObject, createObject: addObject, fetchObjectById }
})

