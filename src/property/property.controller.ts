import { Body, Controller, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { idParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { CreatePropertySchema, CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {

    propertyService:PropertyService;
    constructor() { 
        this.propertyService = new PropertyService();
    }

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
    @UsePipes(new ZodValidationPipe(CreatePropertySchema))
    create(@Body() body: CreatePropertyZodDto) {
        return this.propertyService.create(body);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIdPipe) id: number,
        @Body() body: CreatePropertyDto,
    ) {
        return this.propertyService.update(id, body);
    }

    @Post('headers')
    getHeaders(@RequestHeader(HeadersDto) headers: HeadersDto) {
        return headers;
    }
}