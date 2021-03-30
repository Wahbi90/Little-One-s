import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { UserModule } from './users.module';

@Injectable()
export class UsersService {
  private Users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async insertUser(
    FirstName : string,
    LastName:string,
    Email:string,
    Gender:string,
    PhoneNumber:number,
    Types:string,
    createdAt:any,
  ) {
    const newUser = new this.userModel({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Gender: Gender,
      PhoneNumber: PhoneNumber,
      Types :Types,
      createdAt:createdAt,
    });
    const result = await newUser.save();
    console.log(result);
    return result._id as string;
  }

  async getUser() {
    const UserList = await this.userModel.find();
    return UserList.map((el) => ({
      FirstName: el.FirstName,
      LastName: el.LastName,
      Email: el.Email,
      Gender: el.Gender,
      PhoneNumber: el.PhoneNumber,
      Types :el.Types,
      createdAt:el.createdAt,
    }));
  }

  // async getSearchedStudent(Search: string) {
  //   let StudentList;
  //   try{
  //     if(Search === null || Search.length === 0){
  //       StudentList = await this.studentModel.find().exec()
  //     }else{
  //       StudentList = await this.studentModel.find({FirstName: Search}).exec()
  //     }
  //   }catch(error) {
  //       throw new NotFoundException('Name do not exist')
  //   }
  //   if (!StudentList) {
  //     throw new NotFoundException('Could not find Student.');
  //   }

  //   return StudentList.map((el) => ({
  //     id: el.id,
  //     FirstName: el.FirstName,
  //     LastName: el.LastName,
  //     age: el.age,
  //     Gender: el.Gender,
  //     image: el.image,
  //   }));
  // }

  async getSingleUser(userId: string) {
    const singleUser = await this.findUser(userId);
    return singleUser;
  }

  private async findUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }

  async updateUser(
    userId : string,
    FirstName : string,
    LastName:string,
    Email:string,
    Gender:string,
    PhoneNumber:number,
    Types:string,
    createdAt:any,
  ) {
    const updateUser = await this.findUser(userId);
    if (FirstName) {
      updateUser.FirstName = FirstName;
    }
    if (LastName) {
      updateUser.LastName = LastName;
    }
    if (Email) {
      updateUser.Email = Email;
    }
    if (Gender) {
      updateUser.Gender = Gender;
    }
    if (PhoneNumber) {
      updateUser.PhoneNumber = PhoneNumber;
    }
    if (Types) {
      updateUser.Types = Types;
    }
    if (createdAt) {
      updateUser.createdAt = createdAt;
    }
    updateUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId });
    if (result.n === 0) {
      throw new NotFoundException('Could Not Found The User');
    }
  }
}
