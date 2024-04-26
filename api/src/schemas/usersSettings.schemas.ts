import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class UserSettings {
    @Prop({ required: false })
    receiveNotifications: boolean

    @Prop()
    receiveSMS: boolean

    @Prop()
    receiveMail: boolean
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSettings)