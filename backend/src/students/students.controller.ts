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
    @Body('comment') Studcomment: string,
  ) {
    const generatedId = await this.StudentsService.insertStudent(
      StudFirstName,
      StudLastName,
      Studage,
      StudGender,
      Studimage,
      Studcomment,
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


  // @Get('Search')
  // async getSearchedStudent(@Param('Search') studentFirstName: string) {
  //   const searchedStudent = await this.StudentsService.getSearchedStudent(
  //     studentFirstName,
  //   );
  //   return searchedStudent;
  // }

  @Put(':id')
  async updateProduct(
    @Param('id') studentId: string,
    @Body('FirstName') StudFirstName: string,
    @Body('LastName') StudLastName: string,
    @Body('age') Studage: number,
    @Body('Gender') StudGender: string,
    @Body('image') Studimage: string,
    @Body('comment') Studcomment: string,
  ) {
    await this.StudentsService.updateStudent(
      studentId,
      StudFirstName,
      StudLastName,
      Studage,
      StudGender,
      Studimage,
      Studcomment,
    );
    return null;
  }

  @Delete(':id')
  async removeStudent(@Param('id') studentId: string) {
    await this.StudentsService.deleteStudent(studentId);

    return null;
  }
}
