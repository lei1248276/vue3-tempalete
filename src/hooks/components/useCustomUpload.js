/* ********************** 只适用于 el-upload 自定义上传方法"http-request" ************************* */
export default function useCustomUpload() {
  const state = reactive({ list: [] })

  const clear = () => { state.list = [] }

  // ! 获取所有图片网络路径
  const getAddImgs = () => state.list.map(v => v.url)

  // ! 获取被删除图片的网络路径
  const removeImg = async(request, img) => {
    await request(img.url)
    console.log('%c🚀 ~ method: removeImg ~', 'color: #F25F5C;font-weight: bold;', img.url)
    return img
  }

  // ! 图片上传（多张图片会添加多个"file二进制文件"上传）
  const uploadImg = () => {
    let timer, formData = new FormData()

    return (request, params) => {
      return new Promise((resolve) => {
        if (timer) clearTimeout(timer)

        formData.append('file', params.file)
        delete params.file

        timer = setTimeout(async() => {
          console.log('formData.file: ', formData.getAll('file'))
          Object.entries(params).forEach(([key, value]) => { formData.append(key, value) })

          try {
            (await request(formData))
              .result
              .reverse() // ! 网络图片"url"替换本地图片"url"
              .forEach((url, i) => { state.list[state.list.length - (i + 1)].url = url })

            resolve(getAddImgs())
          } finally {
            formData = new FormData()
          }
        })
      })
    }
  }

  return [state, { clear, getAddImgs, removeImg, uploadImg: uploadImg() }]
}
