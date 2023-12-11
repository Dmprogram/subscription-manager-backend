import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { subcriptionObject } from './subscription.object'
import { SubscriptionDto } from './subscription.dto'

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(userId: number, dto: SubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    })
  }

  async getSubscriptionById(userId: number, subscriptionId: number) {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        id: subscriptionId,
        user: { id: userId },
      },
      select: subcriptionObject,
    })
    if (!subscription) {
      throw new NotFoundException('Subscription not found')
    }
    return subscription
  }

  async updateSubscriptionById(userId: number, subscriptionId: number, dto: Partial<SubscriptionDto>) {
    return this.prisma.subscription.update({
      where: {
        id: subscriptionId,
        user: { id: userId },
      },
      data: {
        ...dto,
      },
    })
  }
  async deleteSubscriptionById(userId: number, subscriptionId: number) {
    return this.prisma.subscription.delete({
      where: {
        id: subscriptionId,
        user: { id: userId },
      },
    })
  }

  async getAllSubscriptions(userId: number) {
    return this.prisma.subscription.findMany({
      where: { user: { id: userId } },
      orderBy: { createdAt: 'desc' },
      select: subcriptionObject,
    })
  }
}
