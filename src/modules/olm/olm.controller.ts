import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { OlmService } from "./olm.service";
import { CreateOlmDto } from "./dto/create-olm.dto";
import { UpdateOlmDto } from "./dto/update-olm.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller("v1/olm")
export class OlmController {
  constructor(private readonly olmService: OlmService) {}

  @Post()
  create(@Body() createOlmDto: CreateOlmDto) {
    return this.olmService.create(createOlmDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.olmService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.olmService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOlmDto: UpdateOlmDto) {
    return this.olmService.update(+id, updateOlmDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.olmService.remove(+id);
  }
}
