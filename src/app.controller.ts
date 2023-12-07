import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/number/:id')
  getNumber(@Headers() header, @Param('id') id, @Query('search') search): any {
    const { authorization } = header;
    return { authorization, id, search };
  }
  @Post('/number')
  postNumber(@Body() body): string {
    return body;
  }
}
