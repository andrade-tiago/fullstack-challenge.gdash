import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMapper } from './user.mapper';
import { UsersConstroller } from './users.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UserMapper],
  exports: [UsersService],
  controllers: [UsersConstroller],
})
export class UsersModule {}
