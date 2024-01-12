import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CronJobsService } from './cron-jobs.service'
import { CronJobsController } from './cron-jobs.controller'
@Module({
  providers: [CronJobsService, PrismaService],
  controllers: [CronJobsController],
})
export class CronJobsModule {}
