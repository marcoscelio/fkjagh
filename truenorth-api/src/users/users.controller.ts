import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiBasicAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthDto, LoginResponseDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: "Username and password authentication, no OTP" })
  @ApiResponse({
    status: 201,
    description: "Authentication succeed.",
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Unauthorized.",
  })
  @Post("login")
  async login(@Body() authDto: AuthDto) {
    const result = await this.usersService.login(authDto);
    if (!result) {
      throw new HttpException("Bad request", HttpStatus.FORBIDDEN);
    }
    return { ...result } as LoginResponseDto;
  }

  @Post("register")
  @ApiResponse({
    status: 201,
    description: "Registration succeed.",
  })
  @ApiResponse({
    status: 400,
    description: "Registration bad request.",
    type: RegisterResponseDto,
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.usersService.register(registerDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("security/verify")
  @ApiBasicAuth("Bearer")
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "True or false.",
  })
  async verifyToken(@Req() request) {
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return false;
    }
    return this.usersService.verifyToken(token);
  }
}
