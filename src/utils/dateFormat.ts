import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(dayjs.tz(utcString, 'Asia/Tokyo')).format(format)
}

export function formatTimestamp(
  timestamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return ''
}
