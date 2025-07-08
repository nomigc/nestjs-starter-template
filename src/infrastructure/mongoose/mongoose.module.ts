import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfigService } from './mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: mongooseConfigService,
    }),
  ],
  exports: [MongooseModule],
})
export class DataBaseModule {}
