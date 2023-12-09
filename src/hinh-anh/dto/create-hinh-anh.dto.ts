import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateHinhAnhDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ten_hinh: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duong_dan: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mo_ta: string;
}
