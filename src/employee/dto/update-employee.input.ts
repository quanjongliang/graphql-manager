import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput {
  @Field({ nullable: false })
  id: string;
  @Field({ nullable: true })
  departmentName?: string;
  @Field({ nullable: true })
  title?: string;
}
