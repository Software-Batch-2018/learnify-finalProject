import { Column, Entity,  JoinColumn,  ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import { Content } from "../../courses/entities/content.entity";

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  qa_id: string;


  @Column()
  material_link: string


  @ManyToOne(()=> Content)
  @JoinColumn()
  content: Content
}