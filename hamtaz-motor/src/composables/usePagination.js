import { ref, computed } from 'vue'

export function usePagination(items, pageSize = 6) {
  const currentPage = ref(1)

  const totalPages = computed(() => {
    return Math.ceil(items.value.length / pageSize)
  })

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return items.value.slice(start, end)
  })

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  function goToPage(page) {
    currentPage.value = page
  }

  return { currentPage, totalPages, paginatedItems, nextPage, prevPage, goToPage }
}