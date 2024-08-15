import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../Models/Post/post.model';
import { CreatePostInput } from 'src/DTO/Post/create-post.input';
import { UpdatePostInput } from 'src/DTO/Post/update-post.input';

// Asegúrate de importar los tipos correctos para Prisma si los estás usando
import { Prisma } from '@prisma/client';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class PostWhereUniqueInput {
  @Field(() => Int)
  id: number;
}

@InputType()
class PostWhereInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}

@InputType()
class PostOrderByWithRelationInput {
  @Field(() => Int, { nullable: true })
  id?: number;
}

@Resolver(of => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(returns => Post, { name: 'post' })
  async getPost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postService.post({ id });
  }

  @Query(returns => [Post], { name: 'posts' })
  async getPosts(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('cursor', { nullable: true }) cursor?: PostWhereUniqueInput,
    @Args('where', { nullable: true }) where?: PostWhereInput,
    @Args('orderBy', { nullable: true }) orderBy?: PostOrderByWithRelationInput,
  ): Promise<Post[]> {
    return this.postService.posts({
      skip,
      take,
      cursor,
      where,
    });
  }

  @Mutation(returns => Post)
  async createPost(@Args('data') data: CreatePostInput): Promise<Post> {
    return this.postService.createPost(data);
  }

  @Mutation(returns => Post)
  async updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdatePostInput,
  ): Promise<Post> {
    return this.postService.updatePost({ where: { id }, data });
  }

  @Mutation(returns => Post)
  async deletePost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postService.deletePost({ id });
  }
}
