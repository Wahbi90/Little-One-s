import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.model';
import { StudentModule } from './students.module';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>,
  ) {}

  async insertStudent(
    FirstName: string,
    LastName: string,
    age: number,
    Gender: string,
    image: string,
  ) {
    const newStudent = new this.studentModel({
      FirstName: FirstName,
      LastName: LastName,
      age: age,
      Gender: Gender,
      image: image,
    });
    const result = await newStudent.save();
    console.log(result);
    return result._id as string;
  }

  async getStudent() {
    const StudentList = await this.studentModel.find();
    return StudentList.map((el) => ({
      id: el.id,
      FirstName: el.FirstName,
      LastName: el.LastName,
      age: el.age,
      Gender: el.Gender,
      image: el.image,
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

  async getSingleStudent(studentId: string) {
    const singleStudent = await this.findStudent(studentId);
    return singleStudent;
  }

  private async findStudent(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Could not find student');
    }
    return student;
  }

  async updateStudent(
    studentId: string,
    FirstName: string,
    LastName: string,
    age: number,
    Gender: string,
    image: string
  ){
    const updateStudent = await this.findStudent(studentId);
    if (FirstName){
      updateStudent.FirstName = FirstName
    }
    if (LastName){
      updateStudent.LastName = LastName
    }
    if (age){
      updateStudent.age = age
    }
    if (Gender){
      updateStudent.Gender = Gender
    }
    if (image){
      updateStudent.image = image
    }
    updateStudent.save()
  }

  async deleteStudent (studentId: string) {
    const result = await this.studentModel.deleteOne({_id: studentId});
             if (result.n === 0){
           throw new NotFoundException('Could Not Found The Student')
             }
  }
}
