import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { UserSettings } from './usersSettings.schemas'
import { Post } from './post.schemas'

@Schema()
export class Users {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'UserSettings' })
  settings: UserSettings

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Post' })
  post: Post[]
}

export const UserSchema = SchemaFactory.createForClass(Users)
