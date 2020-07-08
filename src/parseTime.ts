/**
 * 日期格式化
 */
export default function parseTime(time?: number | string | Date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time && time !== 0) {
    return ''
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  if (isNaN(date.getTime()) || !(date instanceof Date)) {
    return '';
  }
  if (format === 'timestamp') {
    return date.getTime()
  }
  const formatObj = {
    Y: date.getFullYear(),
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    d: date.getDate(),
    h: date.getHours() % 12 || 12,
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
    w: date.getDay(),
  }
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  const time_str = format.replace(new RegExp(`([${Object.keys(formatObj).join('')}])+`, 'g'), (result, key: keyof typeof formatObj) => {
    const value = formatObj[key]
    const tl = result.length
    const vl = value.toString().length
    if (key === 'w') {
      return (tl > vl ? '星期' : '周') + week[value as keyof typeof week]
    }
    if (tl >= vl) {
      return value.toString().padStart(tl, '0')
    } else {
      return value.toString().substring(vl - tl, vl + 1)
    }

  })
  return time_str
}
