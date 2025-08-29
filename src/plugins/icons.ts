import { App } from 'vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

// Tipos para las props de los iconos
interface IconProps {
  size?: string | number
  color?: string
  spin?: boolean
  class?: string
}

// Lista de iconos comunes para generar componentes dinámicos
const commonIcons = [
  // Iconos de navegación
  'home',
  'menu',
  'close',
  'search',
  'filter',
  'bars',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'angle-left',
  'angle-right',
  'angle-up',
  'angle-down',
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',

  // Iconos de acción
  'check',
  'times',
  'plus',
  'minus',
  'edit',
  'trash',
  'save',
  'copy',
  'download',
  'upload',
  'share',
  'print',
  'refresh',
  'sync',

  // Iconos de estado
  'info',
  'warning',
  'check-circle',
  'times-circle',
  'exclamation-triangle',
  'question-circle',
  'spinner',
  'clock',
  'calendar',

  // Iconos de usuario
  'user',
  'users',
  'user-plus',
  'user-minus',
  'user-edit',
  'sign-in',
  'sign-out',
  'lock',
  'unlock',

  // Iconos de redes sociales
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
  'github',
  'youtube',
  'whatsapp',
  'telegram',
  'discord',
  'tiktok',

  // Iconos de archivos
  'file',
  'folder',
  'image',
  'video',
  'document',
  'pdf',

  // Iconos de comercio
  'shopping-cart',
  'money-bill',
  'dollar',
  'euro',
  'credit-card',
  'gift',
  'tag',
  'tags',
  'ticket',

  // Iconos de comunicación
  'envelope',
  'phone',
  'comment',
  'comments',
  'bell',
  'at',

  // Iconos de configuración
  'cog',
  'settings',
  'tools',
  'wrench',
  'sliders-h',
  'palette',

  // Iconos de medios
  'play',
  'pause',
  'stop',
  'volume-up',
  'volume-down',
  'volume-off',
  'microphone',
  'camera',
  'video',

  // Iconos de ubicación y transporte
  'map-marker',
  'globe',
  'car',
  'truck',
  'plane'
]

// Plugin para registrar iconos globalmente
export default {
  install(app: App) {
    // Registrar el componente base como BaseIcon
    app.component('BaseIcon', BaseIcon)

    // Registrar componentes dinámicos Icon{Name}
    commonIcons.forEach(iconName => {
      const componentName = `Icon${iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')}`

      app.component(componentName, {
        props: {
          size: {
            type: [String, Number],
            default: '1rem'
          },
          color: {
            type: String,
            default: undefined
          },
          spin: {
            type: Boolean,
            default: false
          },
          class: {
            type: String,
            default: ''
          }
        },
        template: `<BaseIcon 
          :name="'${iconName}'" 
          :size="size" 
          :color="color" 
          :spin="spin" 
          :class="class" 
        />`
      })
    })

    // Método global para crear iconos dinámicamente
    app.config.globalProperties.$icon = (name: string, props?: IconProps) => {
      return app.config.globalProperties.$createElement(BaseIcon, {
        props: {
          name,
          ...props
        }
      })
    }
  }
}

// Exportar la lista de iconos para referencia
export { commonIcons }
