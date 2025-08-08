<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import Icon from '../components/Icon.vue';

const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
          </div>
          <div class="flex items-center">
            <span class="text-gray-600 text-sm hidden sm:block mr-4">
              {{ authStore.user?.username }}
            </span>
            <button 
              @click="handleLogout" 
              class="flex items-center p-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-100 transition-colors"
            >
              <Icon icon="heroicons:arrow-left-on-rectangle-20-solid" class="h-5 w-5 ml-1" />
              خروج
            </button>
          </div>
        </div>
      </nav>
    </header>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>
