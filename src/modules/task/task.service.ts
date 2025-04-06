import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.title = createTaskDto.title;
    task.scheduledDate = createTaskDto.scheduledDate;
    task.description = createTaskDto.description;
    task.pathPicture = createTaskDto.pathPicture;
    task.location = createTaskDto.location;
    task.timeStart = createTaskDto.timeStart;
    task.isExpandable = createTaskDto.isExpandable || false;
    
    return this.tasksRepository.save(task);
  }

  async findAll() {
    
    let items =await this.tasksRepository.find({ relations: ['subtasks'] });
 return { items };
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ 
      where: { id }, 
      relations: ['subtasks'] 
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    
    if (updateTaskDto.title) task.title = updateTaskDto.title;
    if (updateTaskDto.scheduledDate) task.scheduledDate = new Date(updateTaskDto.scheduledDate);
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description;
    
    // Handle file update
    if (updateTaskDto.pathPicture && task.pathPicture && task.pathPicture !== updateTaskDto.pathPicture) {
      // Delete old file if exists
      const oldFilePath = path.join(process.env.UPLOAD_DIR, 'tasks', task.pathPicture);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      // Update with new file path
      task.pathPicture = updateTaskDto.pathPicture;
    } else if (updateTaskDto.pathPicture) {
      task.pathPicture = updateTaskDto.pathPicture;
    }
    
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}