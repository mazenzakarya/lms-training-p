import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.model';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UsersService, UsersRepository]
})
export class UsersModule { }
