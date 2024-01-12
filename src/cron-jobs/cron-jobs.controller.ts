import { Controller, Get, HttpCode } from '@nestjs/common'

import { CronJobsService } from './cron-jobs.service'

@Controller('cron')
export class CronJobsController {
  constructor(private readonly cronJobsService: CronJobsService) {}

  @HttpCode(200)
  @Get()
  async updatePeriod() {
    return this.cronJobsService.updatePeriod()
  }
}
