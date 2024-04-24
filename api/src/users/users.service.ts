import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schemas';
import { UsersModule } from './users.module';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }

    createUser(createUser: createUserDto) {
        const newUser = new this.usersModel(createUser);
        return newUser.save();
    }

    getUser() {
        return this.usersModel.find();
    }

    getUserById(id: string) {
        return this.usersModel.findById(id)
    }

    updateUser(id: string, createUser: updateUserDto) {
        return this.usersModel.findByIdAndUpdate(id, createUser)
    }

    deleteUser(id: string) {
        return this.usersModel.findByIdAndDelete(id)
    }
}
