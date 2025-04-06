import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyController } from './property/property.controller';
import { PropertyModule } from './property/property.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PropertyModule, UserModule],
  controllers: [AppController, PropertyController],
  providers: [AppService],
})
export class AppModule {}
