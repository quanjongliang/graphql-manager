import { Employee } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
  findEmployeesByName(name: string): Promise<Employee[]> {
    // return this.createQueryBuilder('em')
    //   .leftJoinAndSelect('em.department', 'department')
    //   .where('LOWER(em.firstName) ILIKE LOWER(:name)', { name })
    //   .orWhere('LOWER(em.lastName) ILIKE LOWER(:name)', { name })
    //   .andWhere('em.isDeleted = false')
    //   .getMany();

    // const a = this.createQueryBuilder()
    //   .where(`firstName LIKE ‘%’ || :q || ‘%’`, { q: name })
    //   .getMany();

    return this.createQueryBuilder('em')
      .leftJoinAndSelect('em.department', 'department')
      .where(`LOWER(em.firstName) LIKE '%${name.toLowerCase()}%'`)
      .orWhere(`LOWER(em.lastName) LIKE '%${name.toLowerCase()}%'`)
      .andWhere('em.isDeleted = false')
      .getMany();
  }
}
