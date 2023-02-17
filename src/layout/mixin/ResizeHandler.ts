import { useAppStore } from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
let appStore: ReturnType<typeof useAppStore>

export default function ResizeHandler() {
  appStore || (appStore = useAppStore())

  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      appStore.toggleDevice('mobile')
      appStore.closeSideBar(true)
    }
  })

  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  function $_isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  function $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        appStore.closeSideBar(true)
      }
    }
  }
}
