import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { userObject } from './user.object'
import { UserDto } from './user.dto'
import { hash } from 'argon2'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...userObject,
        subscriptions: {
          select: {
            id: true,
            name: true,
            currency: true,
            createdAt: true,
            image: true,
            paymentFrequency: true,
            price: true,
            status: true,
            year: true,
            month: true,
            day: true,
            updatedAt: false,
          },
        },
      },
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (isSameUser && id !== isSameUser.id) throw new BadRequestException('Email already in use')
    const user = await this.byId(id)
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    })
  }
}
