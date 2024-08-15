import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../Models/User/user.model';

@ObjectType()
export class Post {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field(type => User, { nullable: true })
  author?: User;
}
