import { Injectable } from '@nestjs/common';
import { CreateFormQuestionDto } from './dto/create-form-question.dto';
import { UpdateFormQuestionDto } from './dto/update-form-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FormQuestion } from './entities/form-question.entity';
import { Repository } from 'typeorm';
import { Form } from '../form/entities/form.entity';

@Injectable()
export class FormQuestionService {
  constructor(
    @InjectRepository(FormQuestion)
    private readonly repository: Repository<FormQuestion>,
  ) {}
  create(createFormQuestionDto: CreateFormQuestionDto,form :Form) {

    createFormQuestionDto.form=form;
    return this.repository.save(createFormQuestionDto);
  }

  findAll() {
    return `This action returns all formQuestion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formQuestion`;
  }

  update(id: number, updateFormQuestionDto: UpdateFormQuestionDto) {
    return `This action updates a #${id} formQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} formQuestion`;
  }
}
