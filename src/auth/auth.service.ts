import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)
    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }
  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken)

      const user = await this.prisma.user.findUnique({
        where: {
          id: result.id,
        },
      })
      const tokens = await this.issueTokens(user.id)

      return {
        user: this.returnUserFields(user),
        ...tokens,
      }
    } catch (err: unknown) {
      if (typeof err === 'object' && 'message' in err) {
        throw new UnauthorizedException('Invalid refresh token')
      }
    }
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (oldUser) throw new BadRequestException('User already exists')
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number('+7 (###) ###-##-##'),
        password: await hash(dto.password),
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '2h',
    })
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '2d',
    })
    return { accessToken, refreshToken }
  }
  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    }
  }
  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (!user) throw new NotFoundException('User not found')
    const isValid = await verify(user.password, dto.password)
    if (!isValid) throw new UnauthorizedException('Invalid password')
    return user
  }
}
