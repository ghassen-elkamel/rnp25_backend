import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { RolesType } from "src/enums/roles.enum";
import { AuthDto } from "src/modules/auth/dto/auth.dto";
import { Company } from "src/modules/company/entities/company.entity";

import { Role } from "src/modules/users/entities/role.entity";

export class CreateUserDto extends AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty()
  @IsOptional()
  password: string;

  company: Company;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RolesType)
  receivedRole: RolesType;


  role: Role;


  isVerified: boolean;


  isActive: boolean;


  isBlocked: boolean;

  @ApiProperty()
  fcmToken: string;

  @ApiProperty()
  language: string;
}
