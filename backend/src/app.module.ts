import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { UserModule } from './Users/user.module';

@Module({
  imports: [StudentModule,UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://wahbi:habloun90@cluster.vwyfx.mongodb.net/littleOnes?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
