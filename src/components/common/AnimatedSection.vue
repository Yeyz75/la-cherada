<!-- Componente para secciones con animaciones suaves -->
<template>
  <section
    ref="sectionRef"
    :class="[
      'transition-all duration-1000 ease-out transform',
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      containerClass
    ]"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  containerClass?: string
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: '',
  threshold: 0.1
})

const sectionRef = ref<HTMLElement>()
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (sectionRef.value) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true
          }
        })
      },
      {
        threshold: props.threshold,
        rootMargin: '50px'
      }
    )

    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>
