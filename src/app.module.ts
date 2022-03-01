import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database';
import { DepartmentModule } from '@/department';
import { EmployeeModule } from '@/employee';
import { RepositoryModule } from '@/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [EmployeeModule, DepartmentModule, RepositoryModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
