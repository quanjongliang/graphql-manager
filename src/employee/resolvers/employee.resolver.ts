import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Employee } from '../employee.entity';
import { EmployeeService } from '../services';
import { CreateEmployeeInput } from '../dto';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

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
}
