<template>
  <el-upload
    :class="{ 'upload--single': props.limit === 1 }"
    action=""
    :http-request="onSuccess"
    :on-remove="onRemove"
    :limit="props.limit"
    accept=".jpg,.jpeg,.png"
    multiple
    list-type="picture-card"
    :file-list="uploadState.list"
    :on-error="(err) => { ElMessage({ type: 'error',message: err.message}) }"
    v-bind="$attrs"
  >
    <SvgIcon
      icon-class="plus"
      class-name="uploader__icon"
    />
  </el-upload>
</template>

<script lang="ts">
export default {
  name: 'CustomUpload'
}
</script>

<script setup lang="ts">
// import { addImg, removeImg } from '@/api/upload'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  requestParams: {
    type: Object,
    default: () => ({})
  },
  limit: {
    type: Number,
    default: 10
  }
})
const [uploadState, uploader] = useCustomUpload()
watch( // ! 自动填充"file-list"（图片回显时）
  () => props.modelValue,
  value => {
    if (value !== uploadState.list.map(v => v.url).join(',')) {
      uploadState.list = value.split(',').filter(v => v).map(v => ({ url: v }))
    }
  },
  { immediate: true }
)

async function onSuccess({ file }) {
  await uploader.uploadImg(addImg, { file, ...props.requestParams })
  const res = uploader.getAddImgs().join(',')
  emit('update:modelValue', res)
  emit('change', res)
}
async function onRemove(img) {
  await uploader.removeImg(removeImg, img)
  const res = uploader.getAddImgs().join(',')
  emit('update:modelValue', res)
  emit('change', res)
}
</script>
