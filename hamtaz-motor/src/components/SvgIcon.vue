<script setup>
import { ref, computed, watch, h } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'black',
  },
  size: {
    type: [String, Number],
    default: 24,
  },
})

const icon = ref(null)
const error = ref(null)

const iconPath = computed(() => {
  // Tries to find the most specific icon first, then falls back
  const sizePx = `${props.size}px`
  const possiblePaths = [
    `/src/assets/icons/name=${props.name}, state=${props.state}, size=${sizePx}.svg`,
    `/src/assets/icons/name=${props.name}, state=${props.state}.svg`,
    `/src/assets/icons/name=${props.name}.svg`,
  ]

  const modules = import.meta.glob('/src/assets/icons/*.svg', { as: 'raw' })

  for (const path of possiblePaths) {
    if (modules[path]) {
      return modules[path]
    }
  }
  return null
})

watch(
  iconPath,
  async (newPathLoader) => {
    error.value = null
    icon.value = null
    if (newPathLoader) {
      try {
        icon.value = await newPathLoader()
      } catch (e) {
        console.error(e)
        error.value = `Cannot load SVG: ${props.name}`
      }
    } else {
      error.value = `Icon not found: ${props.name}`
    }
  },
  { immediate: true }
)

const SvgComponent = computed(() => {
  if (icon.value && !error.value) {
    // A simple way to create a component from the raw SVG string
    return {
      template: icon.value,
    }
  }
  return null
})
</script>

<template>
  <div
    class="svg-icon-wrapper"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <component :is="SvgComponent" v-if="SvgComponent" />
    <span v-else-if="error" class="text-red-500 text-xs" :title="error">!</span>
  </div>
</template>

<style scoped>
.svg-icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.svg-icon-wrapper :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>