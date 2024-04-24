import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    createUser(@Body() createuser: createUserDto) {
        return this.usersService.createUser(createuser);
    }

    @Get()
    getUser() {
        return this.usersService.getUser()
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id)
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() updateUser: updateUserDto) {
        return this.usersService.updateUser(id, updateUser)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }
}
