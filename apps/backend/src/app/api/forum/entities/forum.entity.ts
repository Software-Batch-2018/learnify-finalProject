import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ForumReply } from './replies.entity';

@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  asked_by: User;

  @OneToMany(() => ForumReply, (forum) => forum.question)
  replies: ForumReply[];
}
