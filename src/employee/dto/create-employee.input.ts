import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  firstName?: string;
  @Field()
  lastName: string;
  @Field()
  departmentName: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  dateOfBirth?: Date;
}
