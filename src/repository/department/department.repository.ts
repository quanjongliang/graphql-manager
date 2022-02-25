import { Department } from '@/department';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {}
