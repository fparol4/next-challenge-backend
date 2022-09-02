import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreController } from './core.controller';
import { CoreService } from './core.service';

import { OrderModule } from '@/modules/orders/order.module'
import { Order } from '@/modules/orders/order.entity'

import { file } from '@/settings/environment'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: file,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      url: process.env.DATABASE_URL as string,
      entities: [Order]
    }),
    // OrderModule
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule { }