import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import GlobalImports from './app.imports';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigService } from './config/config.service';

@Module({
  imports: GlobalImports,
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
