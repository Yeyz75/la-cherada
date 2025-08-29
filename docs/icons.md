# Sistema de Iconos - LaCherada

Este proyecto utiliza PrimeIcons como biblioteca base de iconos, pero con un sistema personalizado que facilita su uso en los templates.

## Formas de usar iconos

### 1. Usando BaseIcon (Recomendado)

El componente `BaseIcon` está registrado globalmente y es la forma más flexible de usar iconos:

```vue
<template>
  <!-- Iconos básicos -->
  <BaseIcon name="home" />
  <BaseIcon name="user" />
  <BaseIcon name="search" />
  
  <!-- Con propiedades personalizadas -->
  <BaseIcon name="heart" color="red" size="2rem" />
  <BaseIcon name="spinner" spin />
  <BaseIcon name="cog" class="text-blue-500" />
  
  <!-- Iconos de redes sociales -->
  <BaseIcon name="facebook" size="1.5rem" />
  <BaseIcon name="twitter" color="#1DA1F2" />
  <BaseIcon name="instagram" />
  <BaseIcon name="linkedin" />
</template>
```

#### Propiedades de BaseIcon:

- `name` (string, requerido): Nombre del icono (sin el prefijo `pi-`)
- `size` (string | number, opcional): Tamaño del icono (ej: "1rem", "20px", 16)
- `color` (string, opcional): Color del icono (ej: "red", "#FF0000", "var(--primary-color)")
- `spin` (boolean, opcional): Si el icono debe girar
- `class` (string, opcional): Clases CSS adicionales

### 2. Usando componentes pre-creados

Puedes importar iconos comunes como componentes individuales:

```vue
<template>
  <IconHome />
  <IconUser size="1.5rem" />
  <IconSearch color="blue" />
  <IconFacebook />
  <IconTwitter />
  <IconInstagram />
</template>

<script setup lang="ts">
import {
  IconHome,
  IconUser,
  IconSearch,
  IconFacebook,
  IconTwitter,
  IconInstagram
} from '@/composables/useIcons'
</script>
```

### 3. Usando PrimeIcons directamente

También puedes usar la sintaxis tradicional de PrimeIcons:

```vue
<template>
  <i class="pi pi-home"></i>
  <i class="pi pi-user text-lg"></i>
  <i class="pi pi-search text-blue-500"></i>
</template>
```

### 4. Creando iconos dinámicamente

Para casos especiales, puedes crear componentes de iconos dinámicamente:

```vue
<script setup lang="ts">
import { createIconComponent } from '@/composables/useIcons'

const IconCustom = createIconComponent('custom-icon-name')
</script>
```

## Iconos disponibles

Todos los iconos de PrimeIcons están disponibles. Algunos de los más comunes incluyen:

### Navegación
- `home`, `menu`, `bars`, `close` (`times`)
- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- `angle-left`, `angle-right`, `angle-up`, `angle-down`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`

### Acciones
- `check`, `times`, `plus`, `minus`
- `edit`, `trash`, `save`, `copy`
- `download`, `upload`, `share`, `print`
- `refresh`, `sync`

### Estado
- `info`, `warning`, `exclamation-triangle`
- `check-circle`, `times-circle`, `question-circle`
- `spinner`, `clock`, `calendar`

### Usuario
- `user`, `users`, `user-plus`, `user-minus`
- `sign-in`, `sign-out`, `lock`, `unlock`

### Redes Sociales
- `facebook`, `twitter`, `instagram`, `linkedin`
- `github`, `youtube`, `whatsapp`, `telegram`
- `discord`, `tiktok`

### Comercio
- `shopping-cart`, `money-bill`, `dollar`, `euro`
- `credit-card`, `gift`, `tag`, `tags`

## Consejos de uso

1. **Usa BaseIcon para la mayoría de casos**: Es la forma más flexible y consistente.

2. **Nombres sin prefijo**: No uses `pi-` en el nombre del icono, el sistema lo agrega automáticamente.

3. **Conversión automática**: El sistema convierte automáticamente nombres en camelCase a kebab-case:
   - `checkCircle` → `pi-check-circle`
   - `userPlus` → `pi-user-plus`

4. **Tamaños consistentes**: Usa tamaños estándar como `1rem`, `1.25rem`, `1.5rem`, `2rem`.

5. **Colores con CSS variables**: Usa variables CSS para colores consistentes con el tema.

## Ejemplos completos

```vue
<template>
  <div class="icon-examples">
    <!-- Botones con iconos -->
    <button class="btn-primary">
      <BaseIcon name="plus" class="mr-2" />
      Agregar
    </button>
    
    <!-- Lista con iconos -->
    <ul class="menu">
      <li>
        <BaseIcon name="home" class="mr-2" />
        Inicio
      </li>
      <li>
        <BaseIcon name="user" class="mr-2" />
        Perfil
      </li>
    </ul>
    
    <!-- Iconos de estado -->
    <div class="status-icons">
      <BaseIcon name="check-circle" color="green" />
      <BaseIcon name="exclamation-triangle" color="orange" />
      <BaseIcon name="times-circle" color="red" />
    </div>
    
    <!-- Spinner con animación -->
    <BaseIcon name="spinner" spin size="2rem" />
  </div>
</template>
```

Para ver todos los iconos disponibles, visita: [PrimeIcons Documentation](https://primevue.org/icons/)
