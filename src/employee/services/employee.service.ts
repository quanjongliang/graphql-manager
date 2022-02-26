import { Department } from '@/entities/department.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeInput } from '../dto';
import { Employee, EMPLOYEE_RELATION } from '../../entities/employee.entity';
import { RELATION_WITH } from '@/entities';

const RELATION = RELATION_WITH([EMPLOYEE_RELATION.DEPARTMENT]);
const ALL_RELATION = RELATION_WITH(Object.values(EMPLOYEE_RELATION));

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createEmployee(createEmployee: CreateEmployeeInput): Promise<Employee> {
    const { departmentName, ...newEmployee } = createEmployee;
    const department = await this.departmentRepository.findOne({
      name: departmentName,
      isDeleted: false,
    });
    return this.employeeRepository.save({
      ...newEmployee,
      department,
    });
  }

  async findAllActiveEmployeeByDepartment(id: string): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { isDeleted: false, department: { id } },
      ...ALL_RELATION,
    });
  }

  async findAllActiveEmployee(): Promise<Employee[]> {
    return this.employeeRepository.find({
      ...ALL_RELATION,
      where: {
        isDeleted: false,
      },
    });
  }
}
