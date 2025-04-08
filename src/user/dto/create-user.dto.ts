import { IsEmail, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    avatar?: string;

    @IsString()
    password: string;
}
