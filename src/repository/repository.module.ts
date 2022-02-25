import { Department } from '@/department';
import { Employee } from '@/employee';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository } from './department';
import { EmployeeRepository } from './employee';

const LIST_ENTITIES = [Department, Employee];

const LIST_REPOSITORIES = [DepartmentRepository, EmployeeRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Department,
      Employee,
      DepartmentRepository,
      EmployeeRepository,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
