<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useObjectStore } from '../stores/objectStore'
import { translationMap } from '../utils/translations'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue'
import EditModal from '../components/EditModal.vue'
import ButtonComponent from '../components/ButtonComponent.vue'

const route = useRoute()
const router = useRouter()
const objectStore = useObjectStore()

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const itemToEdit = ref(null)

function translateKey(key) {
  return translationMap[key] || key
}
const itemId = route.params.id
onMounted(() => {
  objectStore.fetchObjectById(itemId)
})

function handleDelete() {
  showDeleteModal.value = true
}

async function confirmDelete() {
  await objectStore.removeObject(objectStore.currentObject.id)
  closeDeleteModal()
  router.push('/') 
}

function closeDeleteModal() {
  showDeleteModal.value = false
}

function handleEdit(item) {
  itemToEdit.value = item
  showEditModal.value = true
}

async function handleUpdate(updatedItem) {
  await objectStore.editObject(updatedItem)
  closeEditModal()
  await objectStore.fetchObjectById(itemId)
}

function closeEditModal() {
  showEditModal.value = false
  itemToEdit.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
    <div v-if="objectStore.isLoading" class="text-center">در حال بارگذاری...</div>
    <div v-else-if="objectStore.error" class="text-center text-red-500">{{ objectStore.error }}</div>
    
    <div v-else-if="objectStore.currentObject" class="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
      
      <div class="w-full h-48 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
        <span class="text-gray-400">Image</span>
      </div>

      <h1 class="text-3xl font-bold mb-6 border-b pb-4">{{ objectStore.currentObject.name }}</h1>
      
      <div v-if="objectStore.currentObject.data" class="space-y-3 mb-8">
        <div v-for="(value, key) in objectStore.currentObject.data" :key="key" class="flex justify-between text-base">
          <strong class="text-gray-600 font-medium">{{ translateKey(key) }}:</strong>
          <span class="text-gray-900">{{ value }}</span>
        </div>
      </div>
      <p v-else class="text-gray-400 italic mb-8">اطلاعات بیشتری موجود نیست.</p>

      <div class="mt-6 pt-6 border-t flex  space-x-4">
        <ButtonComponent 
          label="ویرایش" 
          type="secondary" 
          @click="handleEdit(objectStore.currentObject)" 
        />
        <ButtonComponent 
          label="حذف" 
          type="primary" 
          @click="handleDelete" 
        />
      </div>
    </div>
  </div>

  <DeleteConfirmationModal
    :show="showDeleteModal"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />
  
  <EditModal
    :show="showEditModal"
    :item="itemToEdit"
    @close="closeEditModal"
    @update="handleUpdate"
  />
</template>
