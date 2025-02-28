import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscirptionFormService } from './subscirption_form.service';
import { CreateSubscirptionFormDto } from './dto/create-subscirption_form.dto';
import { UpdateSubscirptionFormDto } from './dto/update-subscirption_form.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/subscription-form')
export class SubscirptionFormController {
  constructor(private readonly subscirptionFormService: SubscirptionFormService) {}

  @Post()
  @Public()
  create(@Body() createSubscirptionFormDto: CreateSubscirptionFormDto) {
    return this.subscirptionFormService.create(createSubscirptionFormDto);
  }

  @Get()
  findAll() {
    return this.subscirptionFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscirptionFormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscirptionFormDto: UpdateSubscirptionFormDto) {
    return this.subscirptionFormService.update(+id, updateSubscirptionFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscirptionFormService.remove(+id);
  }
}
