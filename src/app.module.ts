import { Module } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { UserService } from './services/User/user.service';
import { PostService } from './services/Post/post.service';
import { PrismaService } from 'prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './Resolvers/User/user.resolver';
import { PostResolver } from './Resolvers/Post/post.resolver';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  })],
  controllers: [AppController],
  providers: [
    UserService,
    PostService,
    PrismaService,
    UserResolver,
    PostResolver
  ],
})
export class AppModule {}
