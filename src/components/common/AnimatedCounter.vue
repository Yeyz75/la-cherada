<!-- Componente para contadores animados -->
<template>
  <div class="text-center">
    <div
      :class="[
        'text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
        'dark:from-blue-400 dark:to-purple-400'
      ]"
    >
      {{ displayValue }}{{ suffix }}
    </div>
    <div
      v-if="label"
      class="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 font-medium"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  targetValue: number
  duration?: number
  suffix?: string
  label?: string
  isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  suffix: '',
  label: '',
  isVisible: false
})

const displayValue = ref(0)

const animateCounter = () => {
  if (!props.isVisible) {
    return
  }

  const startTime = Date.now()
  const startValue = 0
  const endValue = props.targetValue

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    // Función de easing suave
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)

    displayValue.value = Math.floor(
      startValue + (endValue - startValue) * easeOutQuart
    )

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

watch(
  () => props.isVisible,
  newVal => {
    if (newVal) {
      animateCounter()
    }
  }
)

onMounted(() => {
  if (props.isVisible) {
    animateCounter()
  }
})
</script>
