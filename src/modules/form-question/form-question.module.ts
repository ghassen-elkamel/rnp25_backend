import { Module } from '@nestjs/common';
import { FormQuestionService } from './form-question.service';
import { FormQuestionController } from './form-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormQuestion } from './entities/form-question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormQuestion]),
  ],
  controllers: [FormQuestionController],
  providers: [FormQuestionService],
  exports: [FormQuestionService],
})
export class FormQuestionModule {}
