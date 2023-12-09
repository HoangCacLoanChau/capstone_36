import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config/dist';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
