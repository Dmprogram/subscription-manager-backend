import { Module } from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { SubscriptionController } from './subscription.controller'
import { PrismaService } from 'src/prisma.service'
import { CloudinaryService } from 'src/cloudinary/clodinary.service'

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PrismaService, CloudinaryService],
})
export class SubscriptionModule {}
