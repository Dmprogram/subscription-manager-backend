import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  Delete,
  ValidationPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { SubscriptionService } from './subscription.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SubscriptionDto } from './subscription.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getSubscriptionById(@CurrentUser('id') userId: number, @Param('id') subscriptionId: string) {
    return this.subscriptionService.getSubscriptionById(userId, parseInt(subscriptionId, 10))
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get()
  async getAllSubscriptions(@CurrentUser('id') userId: number) {
    return this.subscriptionService.getAllSubscriptions(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('/upload/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.subscriptionService.uploadImage(file)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createSubscription(@CurrentUser('id') userId: number, @Body() dto: SubscriptionDto) {
    return this.subscriptionService.createSubscription(userId, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch(':id')
  async updateSubscriptionById(
    @CurrentUser('id') userId: number,
    @Param('id') subscriptionId: string,
    @Body() dto: Partial<SubscriptionDto>,
  ) {
    return this.subscriptionService.updateSubscriptionById(userId, parseInt(subscriptionId, 10), dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async deleteSubscriptionById(@CurrentUser('id') userId: number, @Param('id') subscriptionId: string) {
    return this.subscriptionService.deleteSubscriptionById(userId, parseInt(subscriptionId, 10))
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch('/change-status/:id')
  async changeSubscriptionStatus(
    @CurrentUser('id') userId: number,
    @Param('id') subscriptionId: string,
    @Body() dto: Pick<SubscriptionDto, 'status'>,
  ) {
    return this.subscriptionService.changeSubscriptionStatus(userId, parseInt(subscriptionId, 10), dto)
  }
}
