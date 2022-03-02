import { Department, Employee } from '@/entities';
import {
  Args,
  Directive,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateDepartmentInput } from '../dto/create-department.input';
import { UpdateDepartmentInput } from '../dto/update-department.input';
import { DepartmentService } from '../services/';
// import { Employee, EmployeeService } from '@/employee';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(
    private readonly departmentService: DepartmentService, // private employeeService: EmployeeService,
  ) {}

  @Mutation(() => Department, { name: 'oneCreateDepartment' })
  createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department])
  findAllActiveDepartment() {
    return this.departmentService.findAllActive();
  }

  @Directive(
    '@deprecated(reason: "This query will be removed in the next version")',
  )
  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.departmentService.findOne(id);
  }

  @ResolveField(() => [Employee])
  async employeeInformation(@Parent() department: Department) {
    const { id } = department;
    return this.departmentService.findAllActiveEmployeeByDepartment(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    // return this.departmentService.update(
    //   updateDepartmentInput.id,
    //   updateDepartmentInput,
    // );
  }

  @Mutation(() => Department)
  removeDepartment(@Args('id', { type: () => Int }) id: string) {
    // return this.departmentService.remove(id);
  }
}
