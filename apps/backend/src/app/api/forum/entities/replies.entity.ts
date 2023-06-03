import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Forum } from './forum.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ForumReply {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Forum)
  question: Forum;

  @ManyToOne(() => User)
  @JoinColumn()
  replied_by: User;
}
