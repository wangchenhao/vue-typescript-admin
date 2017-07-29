/**
 * vue 过滤器设置
 */
import moment, { Moment } from 'moment'

export const dateFormat: Function = (value: string, ...arge: any[]): string => {
  const format = arge[0] || 'YYYY-MM-DD HH:mm:ss'
  const date: Moment = moment(value)
  if (date.isValid()) {
    return date.format(format)
  }
  return ''
}
