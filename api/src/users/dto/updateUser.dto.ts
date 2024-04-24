import { IsOptional, IsString } from "class-validator";


export class updateUserDto {

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    password: string
}