import { EntityType, generateCodeForEntity } from '@/core';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AfterLoad, BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employee } from './employee.entity';

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

  @AfterLoad()
  changeDescription() {
    this.description = `Description of ${this.name} Department: ${this.description}`;
  }
}

export const DEPARTMENT_RELATION = {
  EMPLOYEE: 'employees',
};
