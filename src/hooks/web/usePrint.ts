/* eslint-disable no-redeclare */
import type { VNode } from 'vue'
import { createVNode, render } from 'vue'

/**
 * @description 页面局部打印或模版 / 异步模板打印
 * @param dom DOM元素
 */
export default function usePrint(dom: HTMLElement): void

/**
 * @description 页面局部打印或模版 / 异步模板打印
 * @param component vue组件
 * @param props 组件props
 * @param timeout 打印超时时间
 */
export default function usePrint(component: ReturnType<typeof defineAsyncComponent>, props?: Record<string, any>, timeout?: number): void

export default function usePrint(dom: HTMLElement | ReturnType<typeof defineAsyncComponent>, props = {}, timeout = 5000) {
  let instance: VNode | { el: HTMLElement } | null
  dom instanceof Node
    ? instance = { el: dom }
    : render((instance = createVNode(dom, props)), document.createElement('div'))

  // * 创建
  const fragment = document.createDocumentFragment()
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.append(iframe)

  // * 打印
  print(instance, () => {
    document.querySelectorAll("[rel='stylesheet']").forEach(tag => { fragment.append(tag.cloneNode(true)) })
    document.querySelectorAll('style').forEach(tag => { fragment.append(tag.cloneNode(true)) })
    iframe.contentDocument?.head.append(fragment)
    iframe.contentDocument?.body.append(transform(instance!))

    // ! 添加样式文件时会发出网络请求（都是缓存文件）而浏览器打印时会暂停网络请求，所以添加延迟避免一些边界情况
    setTimeout(() => {
      iframe.focus()
      iframe.contentWindow?.print()
    }, 200)
  }, timeout)

  // * 卸载
  iframe.contentWindow?.addEventListener('afterprint', () => {
    iframe.remove()

    if (hasCanvas(instance?.el as HTMLElement)) {
      (instance?.el as HTMLElement).querySelectorAll('.canvasImg').forEach(canvas => {
        canvas.parentNode?.removeChild(canvas)
      })
    }

    instance = null
  })
}

function print(dom: VNode | { el: HTMLElement }, callback: Function, timeout: number) {
  if (dom.el?.nodeType === 1) return callback()

  // * 模板可能是异步的（没发现有类似Suspense组件的resolve事件回调）所以定时递归执行
  const delay = 200
  if (timeout - delay > 0) {
    setTimeout(() => { print(dom, callback, timeout - delay) }, delay)
  }
}

function transform(instance: VNode | { el: HTMLElement }) {
  if (hasCanvas(instance.el as HTMLElement)) transCanvas(instance.el as HTMLElement)

  // * 如果传递的参数是组件的话也就代表是页面上不需要展示的模板所以就直接使用
  return isVNode(instance) ? instance.el as HTMLElement : instance.el?.cloneNode(true)
}

function isVNode(instance: any): instance is VNode {
  return !!instance['__v_isVNode']
}

function hasCanvas(el: HTMLElement) {
  return !!el.querySelector('canvas')
}

// * 将canvas全部生成为图片，打印完后再删除
function transCanvas(el: HTMLElement) {
  const canvasList = el.querySelectorAll('canvas')

  canvasList.forEach(canvas => {
    const parent = canvas.parentNode!
    const canvasUrl = canvas.toDataURL('image/png')
    const img = new Image()
    img.className = 'canvasImg'
    img.src = canvasUrl
    parent.append(img)
  })
}
