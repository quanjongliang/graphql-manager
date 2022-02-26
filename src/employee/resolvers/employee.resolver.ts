import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { EmployeeService } from '../services';
import { CreateEmployeeInput } from '../dto';
import { Employee } from '@/entities';

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
