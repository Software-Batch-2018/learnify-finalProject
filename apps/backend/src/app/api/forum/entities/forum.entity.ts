import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ForumReply } from './replies.entity';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  asked_by: User;

  @OneToMany(() => ForumReply, (forum) => forum.question)
  replies: ForumReply[];

  @CreateDateColumn()
  created_at: Date;
}
