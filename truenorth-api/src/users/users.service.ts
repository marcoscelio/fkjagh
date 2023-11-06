import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { AuthDto } from './dto/auth.dto';
import { EncryptionUtils } from 'src/utils/encryption/encryptionUtils';
import { JwtService } from '@nestjs/jwt';
import { ErrorCodes } from 'src/utils/errorCode';

@Injectable()
export class UsersService {

  constructor(
    private jwtService: JwtService,
    private encryptionUtils: EncryptionUtils,
  ) { }

  async validateUser(username: string, pass: string): Promise<UserDto> {
    const user = await this.findByUsername(username);
    if (user) {
      const password = this.encryptionUtils.decrypt(user.password)
      if (user && password === pass) {
        return user;
      }
    }
    return null;
  }

  async verifyToken(token: string) {
    const data = this.jwtService.verify(token);
    const user = await this.findById(data.id);
    if (user) {
      return {
        ...user,
        accessToken: this.jwtService.sign({
          username: user.username,
          id: user.id,
          status: user.status,
          sub: {
            username: user.username,
            id: user.id,
          },
        }),
        password: null,
      };
    }
    return null;
  }

  async login(authDto: AuthDto) {
    const user = await this.validateUser(authDto.username, authDto.password);
    if (user) {
      return {
        ...user,
        accessToken: this.jwtService.sign({
          username: user.username,
          id: user.id,
          status: user.status,
          sub: {
            username: user.username,
            id: user.id,
          },
        }),
        password: null,
      };
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    try {
      return await this.create({
        username: registerDto.username,
        password: this.encryptionUtils.encrypt(registerDto.password),
      });
    } catch (error) {
      console.error(error)
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        throw new Error(ErrorCodes.DUPLICATE_USER);
      }
    }
  }

  getUserId = async (token: string) => {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      console.error(
        `error AuthInterceptor->getUserId: ${error.message}`,
        error
      );
      return null;
    }
  };

  findByUsername = async (username: string) => {
    const user = await User.find({
      where: {
        username
      }
    })
    if (!user?.length) {
      throw new HttpException("User not found.", HttpStatus.FORBIDDEN);
    }
    return user[0];
  };

  create(registerDto: RegisterDto) {
    const user = plainToClass(User, registerDto);
    return User.save(user);
  }

  findAll() {
    return User.find()
  }

  async findById(id: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User does not exist.")
    }
    return user
  }

  findOne(id: string) {
    return User.findOne({ where: { id } })
  }

  update(id: string, userDto: UpdateUserDto) {
    const user = plainToClass(User, userDto);
    return User.update(id, user)
  }

  remove(id: string) {
    return User.delete(id);
  }
}
