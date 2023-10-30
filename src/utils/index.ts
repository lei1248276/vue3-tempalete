export function parseTime(time: Date | string | number, format = '{y}-{m}-{d} {h}:{i}:{s}'): string | null {
  if (!time) return null

  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time, 10)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key: keyof typeof formatObj) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]

    return value.toString().padStart(2, '0')
  })

  return time_str
}

// * 生成范围随机数
export function rangeRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
