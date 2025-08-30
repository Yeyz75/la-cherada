import { defineAsyncComponent, type AsyncComponentLoader } from 'vue'

// Mapa de componentes PrimeVue con lazy loading
const primeVueComponents = {
  // Data
  Card: () => import('primevue/card'),
  DataTable: () => import('primevue/datatable'),
  Column: () => import('primevue/column'),
  Avatar: () => import('primevue/avatar'),
  Badge: () => import('primevue/badge'),
  Chip: () => import('primevue/chip'),
  Tag: () => import('primevue/tag'),
  Image: () => import('primevue/image'),

  // Forms
  Dropdown: () => import('primevue/dropdown'),
  Calendar: () => import('primevue/calendar'),
  Checkbox: () => import('primevue/checkbox'),
  RadioButton: () => import('primevue/radiobutton'),
  Textarea: () => import('primevue/textarea'),

  // Navigation
  Menu: () => import('primevue/menu'),
  Menubar: () => import('primevue/menubar'),

  // Layout
  Divider: () => import('primevue/divider'),
  Panel: () => import('primevue/panel'),

  // Overlay
  Dialog: () => import('primevue/dialog'),
  OverlayPanel: () => import('primevue/overlaypanel'),
  Tooltip: () => import('primevue/tooltip')
} as const

type ComponentName = keyof typeof primeVueComponents

export function useLazyPrimeVue() {
  const loadComponent = (name: ComponentName) => {
    return defineAsyncComponent({
      loader: primeVueComponents[name] as AsyncComponentLoader,
      loadingComponent: () => 'Cargando...',
      delay: 100,
      timeout: 3000
    })
  }

  const loadMultipleComponents = (names: ComponentName[]) => {
    const components: Record<
      string,
      ReturnType<typeof defineAsyncComponent>
    > = {}
    names.forEach(name => {
      components[name] = loadComponent(name)
    })
    return components
  }

  return {
    loadComponent,
    loadMultipleComponents
  }
}
