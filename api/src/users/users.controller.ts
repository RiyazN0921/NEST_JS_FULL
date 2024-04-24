import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import mongoose, { Mongoose } from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createuser: createUserDto) {
        return this.usersService.createUser(createuser);
    }

    @Get()
    @UsePipes(new ValidationPipe())
    getUser() {
        return this.usersService.getUser()
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('Invalid ID', 400)

        const user = await this.usersService.getUserById(id)
        if (!user) throw new HttpException("user not found", 404)
        return user
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: updateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('Invalid ID', 400)
        const user = this.usersService.updateUser(id, updateUser)
        if (!user) throw new HttpException("user not found", 404)
        return user
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) throw new HttpException('Invalid ID', 400)
        const user = this.usersService.deleteUser(id)
        if (!user) throw new HttpException("user not found", 404)
        return user
    }
}
