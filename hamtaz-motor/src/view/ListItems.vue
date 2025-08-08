<script setup>
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useObjectStore } from '../stores/objectStore'
import { usePagination } from '../composables/usePagination.js'
import GridItemCard from '../components/GridItemCard.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue'
import EditModal from '../components/EditModal.vue'
import FeaturedSlider from '../components/FeaturedSlider.vue'

const objectStore = useObjectStore()
const allObjects = computed(() => objectStore.objects)
const { currentPage, totalPages, paginatedItems, nextPage, prevPage, goToPage } = usePagination(allObjects, 8)

const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const showEditModal = ref(false)
const itemToEdit = ref(null)

onMounted(() => {
  objectStore.fetchObjects()
})

function handleDelete(itemId) {
  itemToDelete.value = itemId
  showDeleteModal.value = true
}
function confirmDelete() {
  objectStore.removeObject(itemToDelete.value)
  closeDeleteModal()
}
function closeDeleteModal() {
  showDeleteModal.value = false
  itemToDelete.value = null
}

function handleEdit(item) {
  itemToEdit.value = item
  showEditModal.value = true
}
function handleUpdate(updatedItem) {
  objectStore.editObject(updatedItem)
  closeEditModal()
}
function closeEditModal() {
  showEditModal.value = false
  itemToEdit.value = null
}
</script>

<template>
  <div class="p-4 md:p-8 bg-gray-100 min-h-screen">
    
    <FeaturedSlider />

    <div class="flex justify-between items-center my-8">
      <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900">لیست محصولات</h1>
      <RouterLink to="/create">
        <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm md:text-base">
          + آیتم جدید
        </button>
      </RouterLink>
    </div>

    <div v-if="objectStore.isLoading" class="text-center text-gray-500">
      <p>در حال بارگذاری...</p>
    </div>
    <div v-else-if="objectStore.error" class="text-center text-red-600 bg-red-100 p-4 rounded-lg">
      <p>{{ objectStore.error }}</p>
    </div>

    <div v-else-if="paginatedItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <GridItemCard 
        v-for="item in paginatedItems"
        :key="item.id"
        :item="item"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
    
    <div v-else class="text-center text-gray-500 mt-8">
        هیچ آیتمی برای نمایش وجود ندارد.
    </div>

    <PaginationComponent
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :prev="prevPage"
      :next="nextPage"
      :goTo="goToPage"
    />
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