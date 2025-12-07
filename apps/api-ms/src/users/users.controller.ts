import {
  Body, Controller, Delete, Get, Param, Patch,
  Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserListDto } from './dtos/user-list.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/auth/decorators/auth-user.decorator';
import { UserCreateDto } from './dtos/user-create.dto';
import type { AuthDataDto } from 'src/auth/dtos/auth-data.dto';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Roles } from 'src/auth/decorators/allowed-roles.decorator';
import { UserRole } from './user.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
  ) {}

  @Post()
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getById(@Param('id') id: string) {
    return this._usersService.getById(id)
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this._usersService.delete(id)
  }

  @Get()
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async list(@Query() opt: UserListDto) {
    return this._usersService.list(opt)
  }

  @Patch(':id')
  @Roles(UserRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() data: UserUpdateDto,
  ) {
    return this._usersService.update(id, data)
  }
}
