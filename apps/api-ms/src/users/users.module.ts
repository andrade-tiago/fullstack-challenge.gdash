import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMapper } from './user.mapper';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UserMapper],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
