import { IsInt, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
    @IsString({ always: true })
    @Length(2, 10)
    name: string;
    @IsString()
    @Length(2, 10, { groups: ['create'] }) //this validation just for method create in controller
    @Length(1, 15, { groups: ['update'] })
    description: string;
    @IsInt({ always: true })
    @IsPositive()
    area: number;

}