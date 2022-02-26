import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeInput, UpdateEmployeeInput } from '../dto';
import { Employee, EMPLOYEE_RELATION } from '../../entities/employee.entity';
import { RELATION_WITH } from '@/entities';
import { DepartmentRepository, EmployeeRepository } from '@/repository';
import { EntityType, ERROR_MESSAGE, generateCodeForEntity } from '@/core';

const RELATION = RELATION_WITH([EMPLOYEE_RELATION.DEPARTMENT]);
const ALL_RELATION = RELATION_WITH(Object.values(EMPLOYEE_RELATION));

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository,
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

  async updateEmployee(
    updateEmployeeInput: UpdateEmployeeInput,
  ): Promise<Employee> {
    const { id, departmentName, title } = updateEmployeeInput;
    const employee = await this.employeeRepository.findOne({
      where: { isDeleted: false, id },
      ...RELATION,
    });
    if (!employee)
      throw new BadRequestException(ERROR_MESSAGE.EMPLOYEE.NOT_FOUND);
    if (departmentName) {
      // const department = await this.departmentRepository.findDepartmentByCode(
      //   generateCodeForEntity(EntityType.DEPARTMENT, departmentName),
      // );
      const department = await this.departmentRepository.findDepartmentByName(
        departmentName,
      );
      if (!department) {
        throw new BadRequestException(ERROR_MESSAGE.DEPARTMENT.NOT_FOUND);
      }
    }
    return employee;
  }
}
