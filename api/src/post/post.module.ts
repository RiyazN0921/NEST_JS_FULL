import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post.schemas';
import { Users, UserSchema } from 'src/schemas/users.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }, { name: Users.name, schema: UserSchema }])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule { }
