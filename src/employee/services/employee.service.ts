import { ERROR_MESSAGE } from '@/core';
import { RELATION_WITH } from '@/entities';
import { DepartmentRepository, EmployeeRepository } from '@/repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Employee, EMPLOYEE_RELATION } from '../../entities/employee.entity';
import { CreateEmployeeInput, UpdateEmployeeInput } from '../dto';
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
      const department = await this.departmentRepository.findDepartmentByName(
        departmentName,
      );
      if (!department) {
        throw new BadRequestException(ERROR_MESSAGE.DEPARTMENT.NOT_FOUND);
      }
      employee.department = department;
    }

    if (title) {
      employee.title = title;
    }
    return this.employeeRepository.save(employee);
  }

  async findEmployeesByName(name: string): Promise<Employee[]> {
    const employee = await this.employeeRepository.findEmployeesByName(name);
    if (employee.length === 0)
      throw new BadRequestException(ERROR_MESSAGE.EMPLOYEE.NOT_FOUND);
    return employee;
  }
}
