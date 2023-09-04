import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { Subjects } from './subject.entity';
import { QaEntity } from '../../question-answer/entities/qa.entity';
import { Material } from '../../question-answer/entities/material.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  content_id!: string;

  @Column()
  content_title!: string;

  @Column()
  title_image!: string;

  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(() => Subjects, (subject) => subject.contents)
  subject!: Subjects;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => Quiz)
  @JoinColumn()
  quiz: Quiz;

  @OneToOne(() => QaEntity)
  @JoinColumn()
  qa: QaEntity;


  @Column({default: 1})
  view: number;


}
