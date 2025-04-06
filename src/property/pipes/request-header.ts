import {
    ExecutionContext,
    createParamDecorator,
    BadRequestException,
  } from '@nestjs/common';
  import { plainToInstance } from 'class-transformer';
  import { validate } from 'class-validator';
  
  export const RequestHeader = createParamDecorator(
    async (targetDto: any, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const headers = request.headers;
  
      const dto = plainToInstance(targetDto, headers, {
        excludeExtraneousValues: true,
      });
  
      const errors = await validate(dto);
      if (errors.length > 0) {
      
        const messages = errors
          .map(err => Object.values(err.constraints || {}).join(', '))
          .join('; ');
        throw new BadRequestException(`Validation failed: ${messages}`);
      }
  
      return dto;
    },
  );
  