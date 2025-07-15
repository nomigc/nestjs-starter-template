import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from '@/shared/hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/strategy/jwt.strategy';
import { HashModule } from '@/shared/hash/hash.module';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, userSchema } from '@/schemas/common';
import { UserModule } from '../user/user.module';
import { AppConfigService } from '@/config/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: userSchema }]),
    HashModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>('TOKEN_EXPIRE_IN'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AppConfigService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
