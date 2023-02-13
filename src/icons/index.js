import SvgIcon from '@/components/SvgIcon/index.vue'// svg component

// const req = import.meta.glob('./svg/*.svg', { eager: true })
// console.log(req)
// const requireAll = requireContext => Object.keys(requireContext).forEach(key => req[key]())
// requireAll(req)

export function setupSvgIcon(app) {
  app.component('SvgIcon', SvgIcon)
}
