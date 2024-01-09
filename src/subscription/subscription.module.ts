import { Module } from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { SubscriptionController } from './subscription.controller'
import { PrismaService } from '../prisma.service'
import { CloudinaryService } from '../cloudinary/clodinary.service'

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PrismaService, CloudinaryService],
})
export class SubscriptionModule {}
