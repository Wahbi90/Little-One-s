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

  async getSingleStudent(studentId: string) {
        const singleStudent = await this.findStudent(studentId)
        return singleStudent
  }

  private async findStudent(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id);
    if (!student) {
      throw new NotFoundException('Could not find student');
    }
    return student
  }
}
