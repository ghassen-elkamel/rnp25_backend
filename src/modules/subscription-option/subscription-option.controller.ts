import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { SubscriptionOptionService } from "./subscription-option.service";
import { CreateSubscriptionOptionDto } from "./dto/create-subscription-option.dto";
import { UpdateSubscriptionOptionDto } from "./dto/update-subscription-option.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Public } from "src/decorators/public.decorator";
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("v1/subscription-option")
export class SubscriptionOptionController {
  constructor(private readonly subscriptionOptionService: SubscriptionOptionService) {}

  @Post()
  create(@Body() createSubscriptionOptionDto: CreateSubscriptionOptionDto) {
    return this.subscriptionOptionService.create(createSubscriptionOptionDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.subscriptionOptionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscriptionOptionService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSubscriptionOptionDto: UpdateSubscriptionOptionDto) {
    return this.subscriptionOptionService.update(+id, updateSubscriptionOptionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscriptionOptionService.remove(+id);
  }
}
