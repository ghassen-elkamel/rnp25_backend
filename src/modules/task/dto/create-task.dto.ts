import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { CreationEntityDto } from 'src/common/dto/creation.dto';

export class CreateTaskDto  {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString()
  scheduledDate: Date;

  @IsOptional()
  @IsString()
  description: string;
  
  @IsOptional()
  @IsString()
  pathPicture: string;
  
  @IsOptional()
  @IsString()
  location?: string;
  
  @IsOptional()
  @IsString()
  timeStart?: string;
  
  @IsOptional()
  isExpandable?: boolean;
}