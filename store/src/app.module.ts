import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { MongooseModule } from '@nestjs/mongoose';

const {
  MONGODB_URI = 'mongodb',
  MONGODB_PORT = '27017',
  MONGODB_DATABASE = 'anaGamingDB',
  MONGODB_USER,
  MONGODB_PASS,
} = process.env;

const MONGODB_URL = `mongodb://${MONGODB_URI}:${MONGODB_PORT}/${MONGODB_DATABASE}`;

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL, {
      authSource: 'admin',
      user: MONGODB_USER,
      pass: MONGODB_PASS,
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
