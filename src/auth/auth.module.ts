import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt/dist'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from '../prisma.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { jwtConfig } from '../config/jwt.config'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
