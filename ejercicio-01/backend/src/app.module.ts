import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HolaController } from './hola/hola.controller.js';

@Module({
  imports: [],
  controllers: [AppController, HolaController],
  providers: [AppService],
})
export class AppModule {}
