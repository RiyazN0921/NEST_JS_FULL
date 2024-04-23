import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schemas';
import { UsersModule } from './users.module';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }

    createUser(createUser: createUserDto) {
        const newUser = new this.usersModel(createUser);
        return newUser.save();
    }
}
