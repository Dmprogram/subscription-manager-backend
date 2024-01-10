import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { UserModule } from './user/user.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { CronJobsModule } from './cron-jobs/cron-jobs.module'
import { CronJobsService } from './cron-jobs/cron-jobs.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    SubscriptionModule,
    CloudinaryModule,
    CronJobsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, CronJobsService],
})
export class AppModule {}
