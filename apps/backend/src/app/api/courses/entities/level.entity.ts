import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subjects } from './subject.entity';

@Entity()
export class Level {
  @PrimaryGeneratedColumn('uuid')
  level_id!: string;

  @Column()
  level!: string;

  @Column()
  level_img!: string;

  @OneToMany(() => Subjects, (subject) => subject.level)
  subjects: Subjects[];
}
