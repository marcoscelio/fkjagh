import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationDto } from './dto/operation.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService, private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOperationDto: OperationDto, @Req() request) {
    return this.operationsService.create(createOperationDto);
  }

  @Get()
  findAll() {
    return this.operationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationDto: OperationDto) {
    return this.operationsService.update(id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}
