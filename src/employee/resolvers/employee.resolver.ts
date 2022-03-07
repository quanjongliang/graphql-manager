import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmployeeService } from '../services';
import { CreateEmployeeInput, UpdateEmployeeInput } from '../dto';
import { Department, Employee } from '@/entities';
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @ResolveField(() => Department)
  departmentInformation(@Parent() employee: Employee) {
    return this.employeeService.findDepartmentOfEmployee(
      employee.department.id,
    );
  }

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeeService.createEmployee(createEmployeeInput);
  }

  @Query(() => [Employee])
  findAllActiveEmployee() {
    return this.employeeService.findAllActiveEmployee();
  }

  @Query(() => [Employee])
  findAllActiveEmployeeByDepartment(@Args('depName') depName?: string) {
    return this.employeeService.findAllActiveEmployeeByDepartmentName(depName);
  }

  @Query(() => [Employee], { name: 'findEmployeesByName' })
  findEmployeesByName(@Args('name', { type: () => String }) name?: string) {
    return this.employeeService.findEmployeesByName(name);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.employeeService.updateEmployee(updateEmployeeInput);
  }

  @Mutation(() => Employee)
  deleteEmployee(@Args('id') id: string) {
    return this.employeeService.deleteEmployee(id);
  }
}
