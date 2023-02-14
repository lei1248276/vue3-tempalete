/**
 * @Date 2022-07-15 09:53:57
 * @description 自动下载
 * @param { Blob } data
 * @param { String } filename
 * @return void
**/
export default function useDownload(data: Blob, filename: string) {
  const url = URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
