import {
  ConflictException, Injectable,
  Logger, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { User, UserDocument } from './user.model';
import { PasswordService } from '../common/password.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserMapper } from './user.mapper';
import { UserListDto } from './dtos/user-list.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { Pagination } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  // private readonly _logger = new Logger(UsersService.name)

  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,

    private readonly _passwordService: PasswordService,
    private readonly _userMapper: UserMapper,
  ) {}

  async create(command: UserCreateDto): Promise<string> {
    const passwordHash =
      await this._passwordService.hash(command.password)

    const userWithEmailExists =
      await this._userModel.exists({ email: command.email }).exec()

    if (!!userWithEmailExists)
      throw new ConflictException('User with e-mail already exists.')

    const user = new this._userModel({
      name: command.name,
      email: command.email,
      pass: passwordHash,
    })

    await user.save()
    return user._id.toString()
  }

  async getById(id: string) {
    const user = await this._userModel.findById(id).exec()

    if (!user)
      throw new NotFoundException('User not found.')

    return this._userMapper.toResponse(user);
  }

  async delete(id: string) {
    await this._userModel.findByIdAndDelete(id).exec()
  }

  async list(query: UserListDto): Promise<Pagination<UserResponseDto>> {
    query.pageNumber ??= 1
    query.pageSize ??= 10

    const skip = (query.pageNumber - 1) * query.pageSize

    const [users, totalCount] = await Promise.all([
      this._userModel.find().skip(skip).limit(query.pageSize).exec(),
      this._userModel.countDocuments().exec(),
    ])

    const userDtos = users.map(u => this._userMapper.toResponse(u))

    return new Pagination({
      data: userDtos,
      pageSize: query.pageSize,
      pageNumber: query.pageNumber,
      totalCount: totalCount,
    })
  }

  async update(id: string, command: UserUpdateDto) {
    const user = await this._userModel.findById(id).exec();

    if (!user)
      throw new NotFoundException('User not found.')

    user.name = command.name

    await user.save()
  }
}