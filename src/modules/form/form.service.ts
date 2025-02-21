import { Injectable } from "@nestjs/common";
import { CreateFormDto } from "./dto/create-form.dto";
import { UpdateFormDto } from "./dto/update-form.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Form } from "./entities/form.entity";
import { Repository } from "typeorm";
import { FormQuestionService } from "../form-question/form-question.service";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly repository: Repository<Form>,
    private readonly formQuestionService: FormQuestionService,
  ) {}
  async createForm(createFormDto: CreateFormDto): Promise<Form> {
    const { title, description, isActive, questions } = createFormDto;

    let form = this.repository.create({
      title,
      description,
      isActive,
    });
    form = await this.repository.save(form);
    if (form) {
      if (questions) {
        for (const question of questions) {
          await this.formQuestionService.create(question, form);
        }
      }
      return form;
    }
  }

  findAll() {
    return this.repository.find({
      relations :{
        questions: true,


      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
  findSignUp() {
    return this.repository.findOne({
      where: {
        isSignUpForm: true,
      },
    });
  }
}
