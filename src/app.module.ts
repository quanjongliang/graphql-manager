import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DepartmentModule } from '@/department';
import { EmployeeModule } from '@/employee';
import { RepositoryModule } from '@/repository';
import { DatabaseModule } from '@/database';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   database: 'manager_db',
    //   username: 'postgres',
    //   password: 'postgres',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    EmployeeModule,
    DepartmentModule,
    RepositoryModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
