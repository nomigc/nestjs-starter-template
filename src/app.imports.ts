import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from './infrastructure/mongoose/mongoose.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';

const GlobalImports: any = [
  //* env global configuration
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),

  //* throttling implementation
  ThrottlerModule.forRoot([
    {
      name: 'globalThrottler',
      ttl: minutes(1),
      limit: 20,
    },
  ]),

  //* others modules
  DataBaseModule,
  AuthModule,
  UserModule,
];

export default GlobalImports;
