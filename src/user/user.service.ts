import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User as UserTypeInPrisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    const res = users.map((u) => this.fixDataTimeFormat(u));
    return plainToInstance(User, res);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) return plainToInstance(User, this.fixDataTimeFormat(user));
    throw new NotFoundException('User not found');
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return plainToInstance(User, this.fixDataTimeFormat(user));
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Wrong password for current user');

    const res = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
      },
    });

    return plainToInstance(User, this.fixDataTimeFormat(res));
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('User not found');
      else throw error;
    }
  }

  private fixDataTimeFormat(user: UserTypeInPrisma): User {
    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }
}
