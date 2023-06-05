/**
 * @description 页面局部打印或模版打印
 */
export default function usePrint(dom: HTMLElement) {
  const fragment = document.createDocumentFragment()
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'

  document.body.append(iframe)
  document.querySelectorAll("[rel='stylesheet']").forEach(tag => { fragment.append(tag.cloneNode(true)) })
  document.querySelectorAll('style').forEach(tag => { fragment.append(tag.cloneNode(true)) })
  iframe.contentDocument?.head.append(fragment)
  iframe.contentDocument?.body.append(transCanvas(dom))

  nextTick(() => {
    iframe.focus()
    iframe.contentWindow?.print()
  })

  iframe.contentWindow?.addEventListener('afterprint', () => {
    nextTick(() => {
      iframe.remove()

      dom.querySelectorAll('.canvasImg').forEach(canvas => {
        const parent = canvas.parentNode!
        parent.removeChild(canvas)
      })
    })
  })
}

// * 将canvas全部生成为图片，打印完后再删除
function transCanvas(dom: HTMLElement) {
  const canvasList = dom.querySelectorAll('canvas')

  if (canvasList.length) {
    canvasList.forEach(canvas => {
      const parent = canvas.parentNode!
      const canvasUrl = canvas.toDataURL('image/png')
      const img = new Image()
      img.className = 'canvasImg'
      img.src = canvasUrl
      parent.append(img)
    })
  }

  return dom.cloneNode(true)
}
