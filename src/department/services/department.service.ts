import { RELATION_WITH } from '@/core';
import { DepartmentRepository } from '@/repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { Department, DEPARTMENT_RELATION } from '..';
import { CreateDepartmentInput } from '../dto/create-department.input';

const RELATION = RELATION_WITH([DEPARTMENT_RELATION.EMPLOYEE]);
const allRelations = Object.values(DEPARTMENT_RELATION);
const ALL_RELATION = RELATION_WITH(allRelations);

@Injectable()
export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async create(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      name: createDepartmentInput.name,
      isDeleted: false,
    });
    if (department) throw new ConflictException('This Department existed!');

    return this.departmentRepository.save(createDepartmentInput);
  }

  async findAllActive(): Promise<Department[]> {
    return this.departmentRepository.find({ isDeleted: false });
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne({
      ...RELATION,
      where: { id, isDeleted: false },
    });
  }
}