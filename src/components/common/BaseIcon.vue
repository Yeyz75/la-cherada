<template>
  <i :class="iconClass" :style="iconStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IconProps {
  name: string
  size?: string | number
  color?: string
  spin?: boolean
  class?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: '1rem',
  spin: false,
  class: ''
})

// Función para convertir el nombre del ícono al formato de PrimeIcons
const formatIconName = (name: string): string => {
  // Si ya tiene el prefijo pi-, lo retornamos tal como está
  if (name.startsWith('pi-')) {
    return name
  }

  // Convertir camelCase a kebab-case y agregar prefijo pi-
  const kebabCase = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

  return `pi-${kebabCase}`
}

const iconClass = computed(() => {
  const baseClass = ['pi', formatIconName(props.name)]

  if (props.spin) {
    baseClass.push('pi-spin')
  }

  if (props.class) {
    baseClass.push(props.class)
  }

  return baseClass.join(' ')
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.size) {
    style.fontSize =
      typeof props.size === 'number' ? `${props.size}px` : props.size
  }

  if (props.color) {
    style.color = props.color
  }

  return style
})
</script>
