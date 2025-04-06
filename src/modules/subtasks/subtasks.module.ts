import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { Subtask } from './entities/subtask.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subtask])
  ],
  controllers: [SubtasksController],
  providers: [SubtasksService],
  exports: [SubtasksService]
})
export class SubtasksModule {}
