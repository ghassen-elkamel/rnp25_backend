import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { QuestionType } from "src/enums/question-type.enum";
import { Form } from "src/modules/form/entities/form.entity";

export class CreateFormQuestionDto {
  @IsNotEmpty()
  question: string;

  @IsOptional()
  type?: QuestionType = QuestionType.TEXT;

  @IsOptional()
  options?: string[];

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;
  form :Form
}
