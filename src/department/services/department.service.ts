import { DEPARTMENT_RELATION, Department, RELATION_WITH } from '@/entities';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentInput } from '../dto/create-department.input';

const RELATION = RELATION_WITH([DEPARTMENT_RELATION.EMPLOYEE]);
const allRelations = Object.values(DEPARTMENT_RELATION);
const ALL_RELATION = RELATION_WITH(allRelations);

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

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
    return this.departmentRepository.find({
      ...RELATION,
      where: { isDeleted: false },
    });
  }

  async findOne(id: string): Promise<Department> {
    return this.departmentRepository.findOne({
      ...RELATION,
      where: { id, isDeleted: false },
    });
  }
}
