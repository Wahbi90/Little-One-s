import {
  Controller,
  Patch,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('User')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async addUser(
    @Body('firstName') userfirstName: string,
    @Body('email') useremail: string,
    @Body('createdAt') usercreatedAt: string,
    @Body('phoneNumber') userphoneNumber: number,
    @Body('userType') useruserType: string,
    @Body('gender') usergender: string,
  ) {
    const generatedId = await this.userService.insertUser(
      userfirstName,
      useremail,
      usercreatedAt,
      userphoneNumber,
      useruserType,
      usergender,
    );
    return { id: generatedId };
  }

  @Get()
  async getUsers() {
    const users = await this.userService.getusers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.userService.getuser(userId);
  }
}
