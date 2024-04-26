import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createPostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    content: string;

    @IsNotEmpty()
    @IsString()
    userId: string
}