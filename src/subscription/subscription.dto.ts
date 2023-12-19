import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class SubscriptionDto {
  @IsString()
  name: string
  @IsString()
  @IsOptional()
  image?: string
  @IsString()
  currency: string
  @IsString()
  paymentFrequency: string
  @IsNumber()
  price: number
  @IsBoolean()
  status: boolean
  @IsNumber()
  year: number
  @IsNumber()
  month: number
  @IsNumber()
  day: number
}
