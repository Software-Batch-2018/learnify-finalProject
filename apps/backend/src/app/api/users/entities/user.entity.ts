import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  public lastLoginAt: Date | null;

  //add column type enum of roles
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  public role: Roles;

  @Exclude()
  private tempPassword!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password !== this.tempPassword) {
      try {
        const salt = await bcrypt.genSalt(8);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (e) {
        console.log(e);
        throw new HttpException(
          'There are some issues in the hashing.',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
