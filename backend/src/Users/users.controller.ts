import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  async adduser(
    @Body('FirstName') userFirstName: string,
    @Body('LastName') userLastName: string,
    @Body('Email') userEmail: string,
    @Body('Gender') userGender: string,
    @Body('PhoneNumber') userPhoneNumber: number,
    @Body('Types') userTypes: string,
    @Body('createdAt') usercreatedAt: any,
  ) {
    const generatedId = await this.UsersService.insertUser(
      userFirstName,
      userLastName,
      userEmail,
      userGender,
      userPhoneNumber,
      userTypes,
      usercreatedAt,
    );
    return { id: generatedId };
  }

  @Get()
  async getAlluser() {
    const alluser = await this.UsersService.getUser();
    return alluser;
  }

  @Get(':id')
  async getOneuser(@Param('id') userId: string) {
    const signleuser = await this.UsersService.getSingleUser(
      userId,
    );
    return signleuser;
  }


  // @Get('Search')
  // async getSearcheduser(@Param('Search') userFirstName: string) {
  //   const searcheduser = await this.UsersService.getSearcheduser(
  //     userFirstName,
  //   );
  //   return searcheduser;
  // }

  @Put(':id')
  async updateProduct(
    @Body('id') userId: string,
    @Body('FirstName') userFirstName: string,
    @Body('LastName') userLastName: string,
    @Body('Email') userEmail: string,
    @Body('Gender') userGender: string,
    @Body('PhoneNumber') userPhoneNumber: number,
    @Body('Types') userTypes: string,
    @Body('createdAt') usercreatedAt: any,
  ) {
    await this.UsersService.updateUser(
      userId,
      userFirstName,
      userLastName,
      userEmail,
      userGender,
      userPhoneNumber,
      userTypes,
      usercreatedAt,
    );
    return null;
  }

  @Delete(':id')
  async removeuser(@Param('id') userId: string) {
    await this.UsersService.deleteUser(userId);

    return null;
  }
}
