import { ApiProperty } from '@nestjs/swagger';

export class hinhAnh {
  @ApiProperty()
  ten_hinh: string;
  @ApiProperty()
  duong_dan: string;
  @ApiProperty()
  mo_ta: string;
}
