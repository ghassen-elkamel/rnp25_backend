import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers,Req, Res, Query, ClassSerializerInterceptor, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileSizeValidationPipe, FilesSizeValidationPipe } from 'src/pipes/file-max-size.pipe';
import { FilesTypeValidationPipe, FileTypeValidationPipe } from 'src/pipes/file-type-validation.pipe';
import { Public } from 'src/decorators/public.decorator';
import { ApiFiles, ApiFilesAWS } from 'src/decorators/api-file.decorator';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiFiles(process.env.UPLOAD_DIR + '/tasks')
  @Post()

  create(

    @Body() createTaskDto: CreateTaskDto,
    @UploadedFiles(FilesTypeValidationPipe)
  
    files?: Array<Express.Multer.File>
  ) {
    if (files?.length > 0) {
      
      createTaskDto.pathPicture = files[0].filename;
      console.log(createTaskDto);
    }


    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiFiles(process.env.UPLOAD_DIR + '/tasks')
  update(
    @Param('id') id: number, 
    @Body() updateTaskDto: UpdateTaskDto,
    @UploadedFiles(FilesTypeValidationPipe)
    files?: Array<Express.Multer.File>
  ) {
    if (files?.length > 0) {
      updateTaskDto.pathPicture = files[0].filename;
    }
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
  

  
  @Public()
  @Get('image')
  getTaskImage(@Res() res, @Query('path') path) {
    res.sendFile(path, {
      root: process.env.UPLOAD_DIR + '/tasks',
    });
  }
}