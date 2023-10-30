export default function ResizeHandler() {
  const { body } = document
  const WIDTH = 992 // refer to Bootstrap's responsive design
  const appStore = useAppStore()

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
