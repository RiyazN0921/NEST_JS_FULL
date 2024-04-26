import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { createPostDto } from './dto/posts.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createPost(@Body() createPost: createPostDto) {
        return this.postService.createPost(createPost)
    }
}
