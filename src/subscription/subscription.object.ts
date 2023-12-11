import { Prisma } from '@prisma/client'

export const subcriptionObject: Prisma.SubscriptionSelect = {
  id: true,
  name: true,
  currency: true,
  price: true,
  status: true,
  createdAt: true,
  day: true,
  month: true,
  year: true,
  image: true,
  paymentFrequency: true,
}
