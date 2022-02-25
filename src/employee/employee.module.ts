import { Module } from '@nestjs/common';
import { RepositoryModule } from '@/repository';
import { EmployeeService } from './services';
import { EmployeeResolver } from './resolvers';

@Module({
  imports: [RepositoryModule],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
