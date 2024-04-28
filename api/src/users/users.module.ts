import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Users, UserSchema } from 'src/schemas/users.schemas'
import {
  UserSettings,
  UserSettingSchema,
} from 'src/schemas/usersSettings.schemas'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRETEKEY',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: UserSettings.name, schema: UserSettingSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
