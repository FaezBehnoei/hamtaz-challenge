<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Icon :icon="icon" />
</template>