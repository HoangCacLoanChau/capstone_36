import {
  Controller,
  Get,
  Body,
  Req,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config/dist';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Nguoi dung')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // @Post('/upload')
  // @UseInterceptors(
  //   //File (s) Interceptor : (upload nhiu file)
  //   FilesInterceptor('file', 4, {
  //     storage: diskStorage({
  //       destination: process.cwd() + 'public/img',
  //       filename: (req, file, callback) => {
  //         callback(null, new Date().getTime() + `_${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
  // //UploadedFile (s) : (upload nhiu file)
  // upload(@UploadedFiles() file) {
  //   return file;
  // }

  @Get()
  findAll() {
    const nodeInfo = this.configService.get('NODE_INFO');
    return nodeInfo;
  }

  @UseGuards(AuthGuard('Jwt'))
  @Get(':id')
  @ApiBearerAuth()
  findOne(@Req() req) {
    return this.usersService.findOne(req.user.nguoi_dung_id);
  }

  @UseGuards(AuthGuard('Jwt'))
  @ApiBearerAuth()
  @Put()
  async updateUserInfo(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.updateUserInfo(
        req.user.nguoi_dung_id,
        updateUserDto,
      );
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `User with ID ${req.user.nguoi_dung_id} not found`,
        );
      }
      throw error;
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
