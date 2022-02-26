import { Department, Employee } from '@/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentRepository, EmployeeRepository } from '.';

const LIST_ENTITIES = [Department, Employee];

const LIST_REPOSITORY = [DepartmentRepository, EmployeeRepository];
@Module({
  imports: [TypeOrmModule.forFeature([...LIST_ENTITIES, ...LIST_REPOSITORY])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
