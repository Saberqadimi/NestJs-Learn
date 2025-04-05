import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { idParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';

@Controller('property')
export class PropertyController {

    @Get()
    findAll() {
        return "Hello Im Saber Qadimi";
    }

    // @Get(':id/:slug')
    // findOne(@Param() params) {
    //     return `this is ID = ${params.id}`;
    // }  

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {

        console.log(typeof (id))
        console.log(typeof (sort))
        return [id, sort]
    }

    @Post()
    // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, groups: ['create'] })) => this line can be used in each controller on method 
    @HttpCode(202)
    create(@Body() body: CreatePropertyDto) {
        return body;
    }

    @Patch(':id')
    update(
        //use DTO Class Validation
        // @Param() { id }: idParamDto,
        //use Pipe custome class
        @Param('id', ParseIdPipe) id,
        @Body() body: CreatePropertyDto) {
        return body;
    }

}
