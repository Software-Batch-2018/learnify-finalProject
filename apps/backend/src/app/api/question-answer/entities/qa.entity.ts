import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QaEntity {
  @PrimaryGeneratedColumn('uuid')
  qa_id: string;



  @OneToMany(() => QaQuestion, (question) => question.qa, { cascade: true })
  @JoinColumn()
  questions: QaQuestion[];
}

@Entity()
export class QaQuestion {
  @PrimaryGeneratedColumn()
  question_id: string;

  @Column()
  questionTitle: string;

  @Column()
  answer: string;

  @ManyToOne(() => QaEntity)
  @JoinColumn()
  qa: QaEntity;
}
