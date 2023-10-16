import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
