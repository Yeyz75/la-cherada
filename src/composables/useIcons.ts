import { defineComponent, h } from 'vue'
import BaseIcon from '@/components/common/BaseIcon.vue'

// Función para crear componentes de iconos dinámicamente
export function createIconComponent(iconName: string) {
  return defineComponent({
    name: `Icon${iconName.charAt(0).toUpperCase() + iconName.slice(1)}`,
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
    render() {
      return h(BaseIcon, {
        name: iconName,
        ...this.$props
      })
    }
  })
}

// Función helper para usar iconos rápidamente en templates
export function useIcon() {
  const Icon = (name: string, props?: IconProps) => {
    return h(BaseIcon, {
      name,
      ...props
    })
  }

  return {
    Icon
  }
}

// Iconos comunes pre-creados para importar directamente
export const IconHome = createIconComponent('home')
export const IconMenu = createIconComponent('menu')
export const IconClose = createIconComponent('times')
export const IconSearch = createIconComponent('search')
export const IconUser = createIconComponent('user')
export const IconCheck = createIconComponent('check')
export const IconEdit = createIconComponent('edit')
export const IconTrash = createIconComponent('trash')
export const IconPlus = createIconComponent('plus')
export const IconMinus = createIconComponent('minus')
export const IconChevronLeft = createIconComponent('chevron-left')
export const IconChevronRight = createIconComponent('chevron-right')
export const IconChevronUp = createIconComponent('chevron-up')
export const IconChevronDown = createIconComponent('chevron-down')
export const IconSpinner = createIconComponent('spinner')
export const IconCog = createIconComponent('cog')
export const IconBell = createIconComponent('bell')
export const IconHeart = createIconComponent('heart')
export const IconStar = createIconComponent('star')
export const IconShoppingCart = createIconComponent('shopping-cart')
export const IconCalendar = createIconComponent('calendar')
export const IconClock = createIconComponent('clock')
export const IconEnvelope = createIconComponent('envelope')
export const IconPhone = createIconComponent('phone')

// Iconos de redes sociales
export const IconFacebook = createIconComponent('facebook')
export const IconTwitter = createIconComponent('twitter')
export const IconInstagram = createIconComponent('instagram')
export const IconLinkedin = createIconComponent('linkedin')
export const IconGithub = createIconComponent('github')
export const IconYoutube = createIconComponent('youtube')
export const IconWhatsapp = createIconComponent('whatsapp')
export const IconTelegram = createIconComponent('telegram')
export const IconDiscord = createIconComponent('discord')
export const IconTiktok = createIconComponent('tiktok')

// Tipos para TypeScript
export interface IconProps {
  size?: string | number
  color?: string
  spin?: boolean
  class?: string
}
