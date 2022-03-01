import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Department } from './department.entity';

@Entity()
@ObjectType()
export class Employee extends BaseEntity {
  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Column()
  title: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @Field((type) => Department, { nullable: true })
  department: Department;
}

export const EMPLOYEE_RELATION = {
  DEPARTMENT: 'department',
};
