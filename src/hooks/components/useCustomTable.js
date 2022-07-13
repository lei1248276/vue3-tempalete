export default function useCustomTable(params) {
  const state = reactive({
    searchForm: {
      current: 1,
      size: 10,
      total: 0,
      params
    },
    list: []
  })

  const onLoad = async(request, query) => {
    const { result } = await request(query || state.searchForm)
    console.log('%c🚀 ~ method: useCustomTable.onLoad ~', 'color: #F25F5C;font-weight: bold;', result)
    if (Array.isArray(result)) {
      state.list = result
    } else {
      state.searchForm.total = result.total
      state.list = result.records
    }
  }

  const addRow = rows => { state.list = state.list.concat(rows) }

  const deleteRow = rows => {
    rows = Array.isArray(rows) ? rows : [rows]
    state.list = rows.length === state.list.length
      ? clear()
      : state.list.filter(row => !rows.includes(row))
  }

  const clear = () => (state.list = [])

  return [state, { onLoad, addRow, deleteRow, clear }]
}
