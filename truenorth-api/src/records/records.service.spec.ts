import { Test, TestingModule } from '@nestjs/testing';
import { RecordsService } from './records.service';
import { mock } from 'jest-mock-extended';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EncryptionUtils } from 'src/utils/encryption/encryptionUtils';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/users/dto/user.dto';
import { Record } from './entities/record.entity';
import { mockResult } from './test/mockResult';


describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordsService, UsersService, JwtService, EncryptionUtils, ConfigService],
    }).compile();

    service = module.get<RecordsService>(RecordsService);

    jest.mock("./entities/record.entity")
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute find records with pagination', async () => {
    const offset = 0;
    const limit = 10;
    const total = 8;
    const count = 8;
    const userDto = {
      username: "test",
    } as UserDto
    const q = "operation"
    const sort = "operation"
    const execute = jest.fn().mockReturnValue(mockResult)
    const getCount = jest.fn().mockReturnValue(count)
    const limitMock = jest.fn().mockReturnValue({ execute })
    const offsetMock = jest.fn().mockReturnValue({ limit: limitMock })
    const orderBy1 = jest.fn().mockReturnValue({ getCount, offset: offsetMock })
    const andWhere1 = jest.fn().mockReturnValue({ orderBy: orderBy1 })
    const andWhere2 = jest.fn().mockReturnValue({ andWhere: andWhere1 })
    const andWhere3 = jest.fn().mockReturnValue({ andWhere: andWhere2 })
    const orderBy2 = jest.fn().mockReturnValue({ andWhere: andWhere3 })
    const innerJoin1 = jest.fn().mockReturnValue({ orderBy: orderBy2 })
    const innerJoin2 = jest.fn().mockReturnValue({ innerJoinAndMapOne: innerJoin1 })
    const mockCreateQueryBuilder = jest.fn().mockReturnValue({ innerJoinAndMapOne: innerJoin2 })
    Record.createQueryBuilder = mockCreateQueryBuilder;

    const data = await service.findAll(offset, limit, userDto, q, sort)

    expect(data.offset).toBe(offset)
    expect(data.total).toBe(count)
    expect(data.result.length).toBe(total)
    expect(execute).toBeCalled()
    expect(getCount).toBeCalled()
    expect(limitMock).toBeCalled()
    expect(offsetMock).toBeCalled()
    expect(orderBy1).toBeCalled()
    expect(orderBy2).toBeCalled()
    expect(andWhere1).toBeCalled()
    expect(andWhere2).toBeCalled()
    expect(andWhere3).toBeCalled()
    expect(innerJoin1).toBeCalled()
    expect(innerJoin2).toBeCalled()
    expect(mockCreateQueryBuilder).toBeCalled()
  });
});
