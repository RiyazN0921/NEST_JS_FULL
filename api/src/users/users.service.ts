import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/users.schemas';
import { UsersModule } from './users.module';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { UserSettings } from 'src/schemas/usersSettings.schemas';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>, @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>) { }

    async createUser({ settings, ...createUser }: createUserDto) {
        if (settings) {
            const newUserSettings = new this.userSettingsModel(settings)
            const savedUserSettings = await newUserSettings.save()

            const newUser = new this.usersModel({ ...createUser, settings: savedUserSettings._id })
            return newUser.save()
        }

        const newUser = new this.usersModel(createUser);
        return newUser.save();
    }

    getUser() {
        return this.usersModel.find().populate(['settings', 'post'])
    }

    getUserById(id: string) {
        return this.usersModel.findById(id).populate(['settings', 'post'])
    }

    async updateUser(id: string, createUser: updateUserDto) {
        const user = await this.usersModel.findByIdAndUpdate(id, createUser)
        return user.save()
    }

    deleteUser(id: string) {
        return this.usersModel.findByIdAndDelete(id)
    }
}
