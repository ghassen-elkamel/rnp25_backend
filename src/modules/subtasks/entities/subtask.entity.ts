import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { CreationEntity } from 'src/common/entities/creation.entity';

@Entity()
export class Subtask extends CreationEntity {

  @Column()
  title: string;

  @Column({ type: 'int', nullable: true })
  durationMinutes: number;

  @Column({ default: false })
  isCompleted: boolean;
  
  @Column({ nullable: true })
  timeStart: string;
  
  @Column({ nullable: true })
  timeEnd: string;

  @ManyToOne(() => Task, task => task.subtasks, { onDelete: 'CASCADE' })
  task: Task;

}