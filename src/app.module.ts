import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// muốn dùng thư viện nào, module custom thì
// import module đó vào app module (tổng)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// express
// routes, controller, model

// nest
// module, controller, service
// module: map các module lại vs nhau và map với các module

// controller <--> routes: định nghĩa các API
// service <---> controller (express): nơi xử lý logic,
// lấy data từ database
