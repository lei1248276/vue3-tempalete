<template>
  <div class="upload-container">
    <el-button
      :style="{background: props.color,borderColor: props.color}"
      type="primary"
      @click="state.dialogVisible = true"
    >
      上传
      <template #icon>
        <svg-icon icon-class="icon_upload" />
      </template>
    </el-button>
    <el-dialog
      v-model="state.dialogVisible"
      title="图片编辑区"
      append-to-body
      @close="onClose"
    >
      <el-upload
        action=""
        :http-request="async ({file}) => { state.fileList = await imgUploader.uploadImg(addRichTextImg,{file, uploadType: 'bbs'}) }"
        accept=".jpg,.jpeg,.png"
        multiple
        list-type="picture-card"
        :file-list="imgUploadState.list"
        :on-error="(err) => { ElMessage({ type: 'error',message: err.message}) }"
        :on-remove="(img) => { imgUploader.removeImg(removeImg, img) }"
      >
        <svg-icon
          icon-class="plus"
          class-name="uploader__icon"
        />
      </el-upload>

      <template #footer>
        <el-button
          type="danger"
          @click="onClose"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditorSlideUpload'
}
</script>

<script setup>
import { addRichTextImg, removeImg } from '@/api/upload'
import { useCustomUpload } from '@/hooks/components'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['successCBK'])
const props = defineProps({
  color: {
    type: String,
    default: '#1890ff'
  }
})

const [imgUploadState, imgUploader] = useCustomUpload()
const state = reactive({
  dialogVisible: false,
  fileList: []
})

function onSubmit() {
  emit('successCBK', state.fileList.map(v => ({ url: v })))
  state.dialogVisible = false
}
function onClose() {
  state.dialogVisible = false
  state.fileList = []
  imgUploader.clear()
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  :deep(.el-upload--picture-card){
    width: 100%;
  }
}
</style>
