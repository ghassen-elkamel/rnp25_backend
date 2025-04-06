import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { Subtask } from './entities/subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private subtasksRepository: Repository<Subtask>,
  ) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    const subtask = new Subtask();
    subtask.title = createSubtaskDto.title;
    subtask.durationMinutes = createSubtaskDto.durationMinutes;
    subtask.isCompleted = createSubtaskDto.isCompleted || false;
    subtask.timeStart = createSubtaskDto.timeStart;
    subtask.timeEnd = createSubtaskDto.timeEnd;
    subtask.task = { id: Number(createSubtaskDto.taskId) } as any;

    return this.subtasksRepository.save(subtask);
  }

  async findAll(taskId?: string) {
    const query = this.subtasksRepository.createQueryBuilder('subtask')
      .leftJoinAndSelect('subtask.task', 'task');

    if (taskId) {
      query.where('task.id = :taskId', { taskId });
    }

    const items = await query.getMany();
    return { items };
  }

  async findOne(id: number): Promise<Subtask> {
    const subtask = await this.subtasksRepository.findOne({
      where: { id },
      relations: ['task'],
    });

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`);
    }

    return subtask;
  }

  async update(id: number, updateSubtaskDto: UpdateSubtaskDto): Promise<Subtask> {
    const subtask = await this.findOne(id);

    Object.assign(subtask, {
      title: updateSubtaskDto.title,
      durationMinutes: updateSubtaskDto.durationMinutes,
      isCompleted: updateSubtaskDto.isCompleted,
      task: updateSubtaskDto.taskId ? { id: updateSubtaskDto.taskId } : subtask.task,
    });

    return this.subtasksRepository.save(subtask);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subtasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subtask with ID ${id} not found`);
    }
  }
}
