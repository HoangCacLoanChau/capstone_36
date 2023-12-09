import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  ho_ten?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Min(0)
  tuoi?: number;

  @ApiProperty()
  @IsOptional()
  anh_dai_dien?: string;
}
