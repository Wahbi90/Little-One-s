import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
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
      return allStudent
    }
  
    @Get(':id')
    async getOneStudent(@Param('id') studentId: string) {
        const signleStudent = await this.StudentsService.getSingleStudent(studentId)
      return signleStudent
    }
  
//     @Patch(':id')
//     updateProduct(
//       @Param('id') prodId: string,
//       @Body('title') prodTitle: string,
//       @Body('description') prodDesc: string,
//       @Body('price') prodPrice: number,
//     ) {
//       this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
//       return null;
//     }
  
//     @Delete(':id')
//     removeProduct(@Param('id') prodId: string) {
//         this.productsService.deleteProduct(prodId);
//         return null;
//     }
   }