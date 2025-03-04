import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, Header, Res } from "@nestjs/common";
import { Response } from 'express';
import { SubscirptionFormService } from "./subscirption_form.service";
import { CreateSubscirptionFormDto } from "./dto/create-subscirption_form.dto";
import { UpdateSubscirptionFormDto } from "./dto/update-subscirption_form.dto";
import { Public } from "src/decorators/public.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ApiFile } from "src/decorators/api-file.decorator";
import { FileSizeValidationPipe } from "src/pipes/file-max-size.pipe";
import { FileTypeValidationPipe } from "src/pipes/file-type-validation.pipe";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("v1/subscription-form")
export class SubscirptionFormController {
  constructor(private readonly subscirptionFormService: SubscirptionFormService) {}

  @Post()
  @Public()
  @ApiFile(process.env.UPLOAD_DIR + process.env.UPLOAD_RECIEPTS_DIR)
  create(@Body() createSubscirptionFormDto: CreateSubscirptionFormDto) {
    return this.subscirptionFormService.create(createSubscirptionFormDto);
  }
  @Get('receipt/:id')
@Header('Content-Type', 'application/pdf')
async getReceipt(@Param('id') id: number, @Res() res: Response) {
    const pdfBuffer = await this.subscirptionFormService.generateReceipt(id);
    res.send(pdfBuffer);
}
  @Post("/receipt/:id")
  @Public()
  @ApiFile(process.env.UPLOAD_DIR + process.env.UPLOAD_RECIEPTS_DIR)
  createReceipt(
    @UploadedFile(FileSizeValidationPipe, FileTypeValidationPipe)
    file: Express.Multer.File,
    @Param("id") id: number,
  ) {
    return this.subscirptionFormService.updateReceipt(id, file);
  }

  @Get()
  findAll() {
    return this.subscirptionFormService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscirptionFormService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubscirptionFormDto: UpdateSubscirptionFormDto) {
    return this.subscirptionFormService.update(+id, updateSubscirptionFormDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscirptionFormService.remove(+id);
  }
}
