import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable() // this function can be using this class outside module property 

export class ParseIdPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);

        if (isNaN(val))
            throw new BadRequestException('id must be a number');
        if (val <= 0)
            throw new BadRequestException('id must be positive');
        return val;
    }
}