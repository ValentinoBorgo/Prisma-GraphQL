import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../../services/User/user.service';
import { User } from '../../Models/User/user.model';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(returns => User)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ) {
    return this.userService.createUser({ name, email });
  }
}
