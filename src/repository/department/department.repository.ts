import { Department } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {}
