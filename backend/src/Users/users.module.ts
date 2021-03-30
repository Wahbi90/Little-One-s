import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
