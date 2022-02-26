import { Module } from '@nestjs/common';
import { EmployeeService } from './services';
import { EmployeeResolver } from './resolvers';
import { RepositoryModule } from '@/repository';

@Module({
  imports: [RepositoryModule],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
