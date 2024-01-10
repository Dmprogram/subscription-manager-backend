import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CronJobsService } from './cron-jobs.service'
@Module({
  providers: [CronJobsService, PrismaService],
})
export class CronJobsModule {}
