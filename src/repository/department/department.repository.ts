import { EntityType, generateCodeForEntity } from '@/core';
import { Department } from '@/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
  findDepartmentByName(name: string): Promise<Department | undefined> {
    const code = generateCodeForEntity(EntityType.DEPARTMENT, name);
    return this.createQueryBuilder('dep')
      .where('LOWER(dep.name) = LOWER(:name)', { name })
      .orWhere('dep.code =:code', { code })
      .andWhere('dep.isDeleted = false')
      .getOne();
  }

  findDepartmentByCode(code: string): Promise<Department | undefined> {
    return this.findOne({ isDeleted: false, code });
  }
}
