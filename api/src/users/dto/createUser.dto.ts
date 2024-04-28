import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

export class userSettingsDto {

    @IsBoolean()
    @IsOptional()
    receiveNotifications: boolean

    @IsBoolean()
    @IsOptional()
    receiveSMS: boolean

    @IsBoolean()
    @IsOptional()
    receiveMail: boolean
}
export class createUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @ValidateNested()
    @Type(() => userSettingsDto)
    settings?: userSettingsDto
}

export class loginDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}