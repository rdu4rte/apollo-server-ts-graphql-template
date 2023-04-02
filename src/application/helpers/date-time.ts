import { DateTime, Settings } from 'luxon'
import { Service } from 'typedi'

@Service()
export class DateTimeUtils {
  dateTime: typeof DateTime

  constructor() {
    Settings.defaultZone = 'America/Sao_Paulo'
    this.dateTime = DateTime
  }

  /**
   * @description Format provided ISODate date format to string
   * @param date Date
   * @returns string
   */
  formatISODate(date: Date): string {
    return this.dateTime.fromISO(date.toISOString()).toFormat('yyyy-MM-dd, HH:mm:ss')
  }
}
