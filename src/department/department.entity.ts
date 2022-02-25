import { BaseEntity } from '@/core';
import { Employee } from '@/employee';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Department extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  @Field((type) => [Employee], { nullable: true })
  employees: Employee[];
}

export const DEPARTMENT_RELATION = {
  EMPLOYEE: 'employees',
};
