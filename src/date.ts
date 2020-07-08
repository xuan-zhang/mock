import parseTime from './parseTime.ts'

export default {
  // 生成一个随机的 Date 对象。
  _randomDate(min?: Date, max?: Date) { // min, max
    min = min === undefined ? new Date(0) : min
    max = max === undefined ? new Date() : max
    return new Date(Math.random() * (max.getTime() - min.getTime()) + min.getTime())
  },
  _isTime(time?: unknown) {
    let tTime: Date
    if (time instanceof Date) {
      tTime = time
    } else {
      tTime = new Date(time as string)
    }
    return Number.isNaN(tTime.getFullYear()) ? undefined : tTime
  },
  // 返回一个随机的日期字符串。
  date(format: string = 'yyyy-MM-dd') {
    return parseTime(this._randomDate(), format)
  },
  dateRange(start: Date | string | number = new Date('2000'), end: Date | number | string = new Date(), format: string = 'yyyy-MM-dd') {
    return parseTime(this._randomDate(this._isTime(start), this._isTime(end)), format)
  },
  // 返回一个随机的时间字符串。
  time(format: string = 'HH:mm:ss') {
    return parseTime(this._randomDate(), format)
  },
  // 返回一个随机的日期和时间字符串。
  datetime(format: string = 'yyyy-MM-dd HH:mm:ss') {
    return parseTime(this._randomDate(), format)
  },
  // 返回当前的日期和时间字符串。
  now(unit?: string, format?: string) {
    // now(unit) now(format)
    if (arguments.length === 1) {
      // now(format)
      if (!/year|month|day|hour|minute|second|week/.test(unit as string)) {
        format = unit
        unit = ''
      }
    }
    unit = (unit || '').toLowerCase()
    format = format || 'yyyy-MM-dd HH:mm:ss'

    var date = new Date()

    /* jshint -W086 */
    // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
    switch (unit) {
      case 'year':
        date.setMonth(0)
      case 'month':
        date.setDate(1)
      case 'week':
      case 'day':
        date.setHours(0)
      case 'hour':
        date.setMinutes(0)
      case 'minute':
        date.setSeconds(0)
      case 'second':
        date.setMilliseconds(0)
    }
    switch (unit) {
      case 'week':
        date.setDate(date.getDate() - date.getDay())
    }

    return parseTime(date, format)
  }
}
