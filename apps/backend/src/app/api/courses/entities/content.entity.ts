import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subjects } from './subject.entity';

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
}
