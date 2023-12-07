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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config/dist';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/upload')
  @UseInterceptors(
    //File (s) Interceptor : (upload nhiu file)
    FilesInterceptor('file', 4, {
      storage: diskStorage({
        destination: process.cwd() + 'public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `_${file.originalname}`);
        },
      }),
    }),
  )
  //UploadedFile (s) : (upload nhiu file)
  upload(@UploadedFiles() file) {
    return file;
  }
  // default là http://local:8080/user
  @Get()
  findAll() {
    const nodeInfo = this.configService.get('NODE_INFO');
    return nodeInfo;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
