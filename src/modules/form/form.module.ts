import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormQuestionModule } from '../form-question/form-question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),FormQuestionModule,
  ],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
