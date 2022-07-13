export default function usePopoverTable(params) {
  const state = reactive({
    searchForm: {
      current: 1,
      size: 10,
      total: 0,
      params
    },
    isShow: false,
    list: []
  })

  const onLoad = async request => {
    const { result } = await request(state.searchForm)
    state.searchForm.total = result.total
    state.list = result.records
    console.log('%c🚀 ~ method: usePopoverTable.onLoad ~', 'color: #F25F5C;font-weight: bold;', result)
  }

  const onShow = boolean => { state.isShow = boolean }

  return [state, { onLoad, onShow }]
}
