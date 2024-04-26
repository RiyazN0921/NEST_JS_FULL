import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schemas';
import { Users } from 'src/schemas/users.schemas';
import { createPostDto } from './dto/posts.dto';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>, @InjectModel(Users.name) private usersModel: Model<Users>) { }

    async createPost({ userId, ...createPostDto }: createPostDto) {
        const findUser = await this.usersModel.findById(userId)
        if (!findUser) throw new HttpException("user not found", 404)
        const newPost = await this.postModel.create(createPostDto)
        const savedpost = await newPost.save()
        await findUser.updateOne({ $push: { post: savedpost._id } })
        return newPost;
    }

}
