import { Employee } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
