import { IsEmail, IsInt, IsNumber, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string

  @IsInt()
  hoursOffset: number
}
