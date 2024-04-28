import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { createUserDto, loginDto } from './dto/createUser.dto'
import { updateUserDto } from './dto/updateUser.dto'
import mongoose, { Mongoose } from 'mongoose'
import { JwtAuthGuard } from './guards/jwt.guards'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  Signup(@Body() signup: createUserDto) {
    return this.usersService.createUser(signup)
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() login: loginDto) {
    return this.usersService.login(login)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  getUser() {
    return this.usersService.getUser()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400)

    const user = await this.usersService.getUserById(id)
    if (!user) throw new HttpException('user not found', 404)
    return user
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() updateUser: updateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400)
    const user = this.usersService.updateUser(id, updateUser)
    if (!user) throw new HttpException('user not found', 404)
    return user
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) throw new HttpException('Invalid ID', 400)
    const user = this.usersService.deleteUser(id)
    if (!user) throw new HttpException('user not found', 404)
    return user
  }
}
