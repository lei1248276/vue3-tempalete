<template>
  <div class="flex items-center">
    <div class="flex flex-col space-y-[10px] mr-[148px]">
      <JCell
        icon="icon-user"
        value="叶松言"
      />
      <JCell
        icon="icon-sex"
        value="男"
      />
      <JCell
        icon="icon-phone"
        value="18923562356"
      />
      <JCell
        icon="icon-card"
        value="456123195602031212"
      />
      <JCell
        icon="icon-date"
        value="1956-02-03"
      />
    </div>

    <div class="flex flex-col space-y-[10px]">
      <JCell
        icon="icon-loc"
        value="湖北省-武汉市-武昌区"
      />
      <JCell
        icon="icon-location"
        value="恒大世纪广场3606"
      />
      <JCell
        icon="icon-menu"
        value="平台用户"
      />
      <JCell
        icon="icon-company"
        value="湖北安福星健康产业发展有限公司"
      />
      <JCell
        icon="icon-time"
        value="2023-03-14 16:43:02"
      />
    </div>

    <div class="ml-auto mr-[100px] flex gap-x-[10px]">
      <div
        v-for="tag in tags"
        :key="tag.text"
        class="relative w-[95px] h-[30px] flex items-center justify-center space-x-[5px] text-sm"
        :style="{color:tag.color}"
      >
        <SvgIcon
          :icon-class="tag.icon"
          class-name="w-[14px] h-[14px]"
        />
        <SvgIcon
          icon-class="icon-bg"
          class-name="-z-10 absolute top-0 right-0 bottom-0 left-0 w-full h-full"
        />
        <span class="text-white">智能床垫</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import JCell from './JCell.vue'

defineOptions({
  name: 'ClientInfo'
})

const tags = [
  { icon: 'icon-heart', text: '智能床垫', color: '#ff5476' },
  { icon: 'icon-house', text: '家庭医生', color: '#517EFF' },
  { icon: 'icon-bed', text: '家庭床位', color: '#03AD82' }
]
</script>
