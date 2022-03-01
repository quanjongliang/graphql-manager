import { Employee } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  findEmployeesByName(name: string): Promise<Employee[]> {
    return this.createQueryBuilder('em')
      .leftJoinAndSelect('em.department', 'department')
      .where('em.firstName =:name', { name })
      .orWhere('em.lastName =:name', { name })
      .andWhere('em.isDeleted = false')
      .getMany();
  }
}
