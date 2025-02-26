import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) { }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string | null) {
    if (hashedRefreshToken !== null) {
      return await this.UserRepo.update({ id: userId }, { hashedRefreshToken })
    }

    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken: undefined })
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto)
    return await this.UserRepo.save(user)
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {
        email
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return this.UserRepo.findOne({
      where: {
        id
      },
      select: ['id', 'firstName', 'lastName', 'avatarUrl', "hashedRefreshToken", "role"] // это поля которые выдаются при поиске
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
