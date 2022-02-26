import { Module } from '@nestjs/common';
import { DepartmentService } from './services';
import { DepartmentResolver } from './resolvers';
import { RepositoryModule } from '@/repository';

@Module({
  imports: [RepositoryModule],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
