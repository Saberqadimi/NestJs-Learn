import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { idParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';


@Controller('property')
export class PropertyController {

    constructor(private propertyService: PropertyService) { }


    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
        @Query('sort', ParseBoolPipe) sort: boolean,
    ) {
        return this.propertyService.findOne(id, sort);
    }

    @Post()
    // @UsePipes(new ZodValidationPipe(CreatePropertySchema))
    create(@Body() dto: CreatePropertyDto) {
        return this.propertyService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIdPipe) id,
        @Body() dto: UpdatePropertyDto,
    ) {
        return this.propertyService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIdPipe) id) {
        return this.propertyService.delete(id);
    }

    @Post('headers')
    getHeaders(@RequestHeader(HeadersDto) headers: HeadersDto) {
        return headers;
    }
}