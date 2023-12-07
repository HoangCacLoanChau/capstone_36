import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class registerDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: ' mật khẩu không được để trống' })
  mat_khau: string;

  @ApiProperty()
  ho_ten: string;

  @ApiProperty()
  @IsNumber()
  tuoi: number;

  @ApiProperty()
  anh_dai_dien: string;
}
