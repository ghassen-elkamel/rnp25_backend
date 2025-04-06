import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Subtask } from '../../subtasks/entities/subtask.entity';
import { CreationEntity } from 'src/common/entities/creation.entity';

@Entity()
export class Task extends CreationEntity {

  @Column()
  title: string;

  @Column({ type: 'datetime' })
  scheduledDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  pathPicture: string;

  @Column({ nullable: true })
  location: string;
  
  @Column({ nullable: true })
  timeStart: string;
  
  @Column({ default: false })
  isExpandable: boolean;

  @OneToMany(() => Subtask, subtask => subtask.task, { cascade: true })
  subtasks: Subtask[];
}