import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    createUser(@Body() createuser: createUserDto) {
        return this.usersService.createUser(createuser);
    }
}
