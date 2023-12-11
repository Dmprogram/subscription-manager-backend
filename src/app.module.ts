import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'
import { SubscriptionModule } from './subscription/subscription.module'

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
