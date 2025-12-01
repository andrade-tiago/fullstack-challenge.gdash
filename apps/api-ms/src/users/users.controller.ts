import {
  Body, Controller, Delete, Get, Param, Patch,
  Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserListDto } from './dtos/user-list.dto';
import type { UserUpdateDto } from './dtos/user-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/auth/decorators/auth-user.decorator';
import type { AuthDataDto } from 'src/auth/dtos/auth-data.dto';
import type { UserCreateDto } from './dtos/user-create.dto';

@Controller('users')
export class UsersConstroller {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() command: UserCreateDto) {
    const id = await this._usersService.create(command)
    
    return { id }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@User() auth: AuthDataDto) {
    return this._usersService.getById(auth.userId)
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this._usersService.getById(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this._usersService.delete(id)
  }

  @Get()
  async list(@Query() opt: UserListDto) {
    return this._usersService.list(opt)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @User() auth: AuthDataDto,
    @Body() data: UserUpdateDto,
  ) {
    return this._usersService.update(auth.userId, {
      name: data.name,
    })
  }
}
