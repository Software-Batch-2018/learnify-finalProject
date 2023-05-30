import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quiz_id: string;

  @Column()
  title: string;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  @JoinColumn()
  questions: Question[];
}
