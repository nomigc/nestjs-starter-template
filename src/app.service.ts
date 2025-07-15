import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      const isConnected = this.connection.readyState === 1;
      if (isConnected) {
        console.log('Database connected established');
      } else {
        console.log('Database not connected');
      }
    } catch (error) {
      console.log('Database connection error', error);
    }
  }
}
