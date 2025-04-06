import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsUUID, IsBoolean } from 'class-validator';
import { CreationEntityDto } from 'src/common/dto/creation.dto';

export class CreateSubtaskDto extends CreationEntityDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
  
  @IsOptional()
  @IsString()
  timeStart?: string;
  
  @IsOptional()
  @IsString()
  timeEnd?: string;

  @IsNotEmpty()

  taskId: string;
}