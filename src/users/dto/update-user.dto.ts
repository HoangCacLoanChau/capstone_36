import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly ho_ten?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  readonly tuoi?: number;
}
