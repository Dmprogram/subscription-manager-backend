import { IsEmail, IsOptional, IsString, isString } from 'class-validator'

export class UserDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  name: string
  @IsOptional()
  @IsString()
  avatarPath: string

  @IsOptional()
  @IsString()
  phone?: string
}
