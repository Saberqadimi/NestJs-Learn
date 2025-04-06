import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
    @IsString({ always: true })
    @Length(2, 10)
    name: string;
    @IsString()
    description: string;
    @IsInt({ always: true })
    @IsPositive()
    price: number;
}