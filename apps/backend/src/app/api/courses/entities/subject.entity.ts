import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { Level } from './level.entity';

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn('uuid')
  subject_id!: string;

  @Column()
  subject_name!: string;

  @Column()
  subject_img!: string;

  @OneToMany(() => Content, (content) => content.subject)
  contents!: Content[];

  @ManyToOne(() => Level, (level) => level.subjects)
  level!: Level;
}
