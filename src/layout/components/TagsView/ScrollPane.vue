<template>
  <el-scrollbar
    ref="scrollbarRef"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent.passive="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts">
export default {
  name: 'ScrollPane'
}
</script>

<script setup lang="ts">
import type { ElScrollbar } from 'element-plus'
import type { TagView } from '@/store/tagsView'

const props = defineProps<{ tags: any[] }>()
const emit = defineEmits(['scroll'])

const tagAndTagSpacing = 4 // tagAndTagSpacing
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()

const scrollContainerRef = computed(() => scrollbarRef.value?.wrapRef)

onMounted(() => {
  scrollContainerRef.value?.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollContainerRef.value?.removeEventListener('scroll', emitScroll)
})

defineExpose({ moveToTarget })

function handleScroll(e: WheelEvent) {
  if (!scrollContainerRef.value) return
  const eventDelta = -e.deltaY * 40
  const $scrollWrapper = scrollContainerRef.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

function emitScroll() {
  emit('scroll')
}

function moveToTarget(currentTag: TagView) {
  if (!scrollContainerRef.value) return

  const $container: HTMLElement = scrollContainerRef.value.parentNode as HTMLElement
  const $containerWidth = $container?.offsetWidth
  const $scrollWrapper = scrollContainerRef.value
  const tagList = props.tags

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = tagList.findIndex(item => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar){
    bottom: 0;
  }
  :deep(.el-scrollbar__wrap){
    height: 49px;
  }
}
</style>
