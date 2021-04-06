import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    firstName: string,
    email: string,
    createdAt: string,
    phoneNumber: number,
    userType: string,
    gender: string,
  ) {
    const newUser = new this.userModel({
      firstName,
      email,
      createdAt,
      phoneNumber,
      userType,
      gender,
    });
    const result = await newUser.save();

    return result._id as string;
  }

  async getusers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id:user.id,
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      gender: user.gender,
    }));
  }

  async getuser(userId: string) {
    const user = await this.findUser(userId);
    return {
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      gender: user.gender,
    };
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
