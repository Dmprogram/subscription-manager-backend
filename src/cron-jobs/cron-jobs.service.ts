import { Injectable } from '@nestjs/common'
import { Subscription } from '@prisma/client'
import { format, addMonths, addYears, addHours } from 'date-fns'
import { PrismaService } from '../prisma.service'

@Injectable()
export class CronJobsService {
  constructor(private readonly prismaService: PrismaService) {}

  private getCurrentDate() {
    const utcYear = new Date().getFullYear()
    const utcMonth = new Date().getMonth()
    const utcDay = new Date().getDate()
    const utcHours = new Date().getHours()
    return new Date(utcYear, utcMonth, utcDay, utcHours)
  }
  async updatePeriod() {
    const subscriptions = await this.prismaService.subscription.findMany({
      where: {
        status: true,
      },
      select: {
        id: true,
        year: true,
        month: true,
        day: true,
        paymentFrequency: true,
      },
    })
    for (let i = 0; i < subscriptions.length; i++) {
      const { ...subscription } = subscriptions[i]
      const subscriptionDate = new Date(
        format(new Date(subscription.year, subscription.month - 1, subscription.day), 'yyyy-MM-dd'),
      )
      const utcNow = this.getCurrentDate()

      if (utcNow.getTime() >= addHours(subscriptionDate, 24).getTime()) {
        const newPeriod = this.getNewPeriod(subscription)
        await this.prismaService.subscription.update({
          where: {
            id: subscription.id,
          },
          data: {
            day: newPeriod.newDay,
            month: newPeriod.newMonth,
            year: newPeriod.newYear,
          },
        })
      }
    }
  }

  private getNewPeriod(subscription: Partial<Subscription>) {
    const { year, month, day, paymentFrequency } = subscription
    let newMonth = month
    let newYear = year
    let newDay = day
    if (paymentFrequency === 'once a month') {
      const newDate = addMonths(new Date(year, month, day), 1)
      newYear = newDate.getFullYear()
      newMonth = newDate.getMonth()
      newDay = newDate.getDate()
    }
    if (paymentFrequency === 'once a year') {
      const newDate = addYears(new Date(year, month, day), 1)
      newYear = newDate.getFullYear()
      newMonth = newDate.getMonth()
      newDay = newDate.getDate()
    }

    return {
      newYear,
      newMonth,
      newDay,
    }
  }
}
