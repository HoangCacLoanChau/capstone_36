import { Module } from '@nestjs/common';
import { HinhAnhService } from './hinh-anh.service';
import { HinhAnhController } from './hinh-anh.controller';

@Module({
  controllers: [HinhAnhController],
  providers: [HinhAnhService],
})
export class HinhAnhModule {}
