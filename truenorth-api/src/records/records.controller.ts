import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, HttpStatus, HttpException } from '@nestjs/common';
import { RecordsService } from './records.service';
import { AddRecordDto, RecordDto } from './dto/record.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('v1/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService, private readonly usersService: UsersService) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() recordDto: AddRecordDto, @Req() request) {
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    const user = await this.usersService.verifyToken(token);
    const userDto = plainToClass(UserDto, user)
    return this.recordsService.create(recordDto, userDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('offset') offset: number, @Query('limit') limit: number,
    @Query('q') q: string, @Query('sort') sort: string, @Req() request) {
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    const user = await this.usersService.verifyToken(token);
    const userDto = plainToClass(UserDto, user)
    return this.recordsService.findAll(offset, limit, userDto, q, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() recordDto: RecordDto) {
    return this.recordsService.update(id, recordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}
