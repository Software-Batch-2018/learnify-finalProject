import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Forum } from './forum.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ForumReply {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  comment: string;

  @ManyToOne(() => Forum)
  question: Forum;

  @ManyToOne(() => User)
  @JoinColumn()
  replied_by: User;

  @CreateDateColumn()
  created_at: Date;
}
