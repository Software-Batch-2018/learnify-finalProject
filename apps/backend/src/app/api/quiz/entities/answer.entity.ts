import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answer_id: string;

  @Column()
  label: string;

  @ManyToOne(() => Question)
  @JoinColumn()
  question: Question;
}
