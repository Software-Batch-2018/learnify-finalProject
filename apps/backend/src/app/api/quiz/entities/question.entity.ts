import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  question_id: string;

  @Column()
  questionTitle: string;

  @Column()
  answerIndex: number;

  @ManyToOne(() => Quiz)
  @JoinColumn()
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  answerOptions: Answer[];
}
