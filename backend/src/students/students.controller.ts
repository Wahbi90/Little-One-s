import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';

import { StudentsService } from './students.service';

@Controller('students')
export class StudentController {
  constructor(private readonly StudentsService: StudentsService) {}

  @Post()
  async addStudent(
    @Body('FirstName') StudFirstName: string,
    @Body('LastName') StudLastName: string,
    @Body('age') Studage: number,
    @Body('Gender') StudGender: string,
    @Body('image') Studimage: string,
  ) {
    const generatedId = await this.StudentsService.insertStudent(
      StudFirstName,
      StudLastName,
      Studage,
      StudGender,
      Studimage,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllStudent() {
    const allStudent = await this.StudentsService.getStudent();
    return allStudent;
  }

  @Get(':id')
  async getOneStudent(@Param('id') studentId: string) {
    const signleStudent = await this.StudentsService.getSingleStudent(
      studentId,
    );
    return signleStudent;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') studentId: string,
    @Body('FirstName') StudFirstName: string,
    @Body('LastName') StudLastName: string,
    @Body('age') Studage: number,
    @Body('Gender') StudGender: string,
    @Body('image') Studimage: string,
  ) {
    await this.StudentsService.updateStudent(
      studentId,
      StudFirstName,
      StudLastName,
      Studage,
      StudGender,
      Studimage,
    );
    return null;
  }

      @Delete(':id')
      async removeStudent(@Param('id') studentId: string) {
         await this.StudentsService.deleteStudent(studentId);

          return null;
      }
}
