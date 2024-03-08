import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return plainToInstance(User, this.db.users);
  }

  findOne(id: string) {
    const user = this.db.users.find((u) => u.id === id);
    if (user) return plainToInstance(User, user);
    throw new NotFoundException('User not found');
  }

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.id = randomUUID();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.version = 1;
    user.createdAt = Date.now();
    user.updatedAt = Date.now();

    this.db.users.push(user);
    return plainToInstance(User, user);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.db.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== updateUserDto.oldPassword)
      throw new ForbiddenException('Wrong password for current user');

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return plainToInstance(User, user);
  }

  remove(id: string) {
    const index = this.db.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.db.users.splice(index, 1);
  }
}
