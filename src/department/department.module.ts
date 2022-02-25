import { Module } from '@nestjs/common';
import { RepositoryModule } from '@/repository';
import { DepartmentService } from './services';
import { DepartmentResolver } from './resolvers';

@Module({
  imports: [RepositoryModule],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
