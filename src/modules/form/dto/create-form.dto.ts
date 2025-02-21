import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { CreateFormQuestionDto } from "src/modules/form-question/dto/create-form-question.dto";


export class CreateFormDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  questions?: CreateFormQuestionDto[];
}

