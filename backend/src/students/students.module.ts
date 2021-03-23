import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.model';
import { StudentController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentsService],
})
export class StudentModule {}
