import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyController } from './property/property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController, PropertyController],
  providers: [AppService, {
    provide: APP_PIPE,
    //Global Validation Pipe
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true

    })
  }],
})
export class AppModule { }
