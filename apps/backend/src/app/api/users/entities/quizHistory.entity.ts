import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Quiz } from "../../quiz/entities/quiz.entity";

@Entity()
export class QuizHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> Quiz)
  @JoinColumn()
  quiz: Quiz;

  @Column()
  numberOfCorrectAnswers: number;

  @Column()
  numberOfWrongAnswers: number;

  @ManyToOne(() => User, user => user.quizHistories)
  user: User;
}