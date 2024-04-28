import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { PostModule } from './post/post.module'

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://riyazn886:iiJdnfwknzK4yqdK@riyaz.aatdsty.mongodb.net/nestjs',
    ),
    UsersModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
