import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { UpdateUserEventDto } from './dto/update-user-event.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/user-event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  @Post()
  create(@Body() createUserEventDto: CreateUserEventDto) {
    return this.userEventService.create(createUserEventDto);
  }
  @Get('verify-uuid/:uuid')
  verifyUuid(@Param('uuid') uuid: string) {
    return this.userEventService.verifyUuid(uuid);
  }

  @Get('event/:id')
  findUserEventByEvent(@Param('id') id: string,@Req() req) {
    let userId=req.user.userId
    return this.userEventService.findUserEventByEvent(+id,userId);
  }
  @Get()
  findAll() {
    return this.userEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserEventDto: UpdateUserEventDto) {
    return this.userEventService.update(+id, updateUserEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEventService.remove(+id);
  }
}
