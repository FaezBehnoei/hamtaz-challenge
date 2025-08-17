<template>
  <div class="error-container" ref="containerElement">
    <div class="text-layer text">404</div>
    <div class="text-layer shadow" ref="shadowElement">404</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const speed = 1.5;
const movement_intensity = 0.2;

const shadowElement = ref(null);
const containerElement = ref(null);

let animationFrameId = null;

function animate(time) {
  const swingX = Math.sin(time * speed * 0.001);
  const swingY = Math.cos(time * speed * 0.001 * 2) * 1;

  const lightX_percent = 50 + swingX * 15;
  const lightY_percent = 10 + swingY * 5;

  if (containerElement.value) {
    containerElement.value.style.setProperty('--x', `${lightX_percent}%`);
    containerElement.value.style.setProperty('--y', `${lightY_percent}%`);
  }

  const offsetX_from_center = (50 - lightX_percent);
  const offsetY_from_center = (30 - lightY_percent);
  const shadowX = offsetX_from_center * window.innerWidth * 0.01 * movement_intensity;
  const shadowY = offsetY_from_center * window.innerHeight * 0.01 * movement_intensity;

  if (shadowElement.value) {
    shadowElement.value.style.transform = `translate(${shadowX}px, ${shadowY}px)`;
  }
  
  animationFrameId = requestAnimationFrame(animate);
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
:global(html), :global(body) {
  height: 100%;
  margin: 0;
  overflow: hidden;
  background-color: #222;
}

.error-container {
  height: 100vh;
  width: 100vw;
  background-image: radial-gradient(circle at var(--x, 50%) var(--y, 30%), #aaa 40px, #222 600px);
  background-repeat: no-repeat;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}

.text-layer {
  position: absolute;
  font-weight: 700;
  font-size: 12rem;
  font-family: system-ui, sans-serif;
  user-select: none;
}

.shadow {
  color: #1a1a1a;
  filter: blur(8px);
  z-index: 5;
}

.text {
  color: grey;
  z-index: 10;
}
</style>