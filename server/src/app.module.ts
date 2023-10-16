import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { AuthModule } from './auth/auth.module';
import { ResponseFormModule } from './response-form/response-form.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URI, { dbName: 'google-form' }),
    UserModule,
    FormModule,
    AuthModule,
    ResponseFormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
