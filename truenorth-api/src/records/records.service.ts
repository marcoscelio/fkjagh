import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AddRecordDto, RecordDto } from './dto/record.dto';
import { Record } from './entities/record.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { Operation, OperationType } from 'src/operations/entities/operation.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Brackets } from 'typeorm';
import axios from 'axios';

@Injectable()
export class RecordsService {

  constructor(private readonly usersService: UsersService) {
  }

  transform = (result: any): Record => {
    const record = new Record();
    record.id = result.record_id;
    record.amount = result.record_amount;
    record.updatedAt = result.record_updatedAt;
    record.operationResponse = result.record_operationResponse;
    record.userBalance = result.record_userBalance;
    record.date = result.record_date;
    record.isActive = result.record_isActive;
    const operation = new Operation();
    operation.id = result.operation_id;
    operation.createAt = result.operation_createAt;
    operation.updatedAt = result.operation_updatedAt;
    operation.type = result.operation_type;
    operation.cost = result.operation_cost;
    record.operation = operation;
    const user = new User();
    user.id = result.user_id;
    user.createAt = result.user_createAt;
    user.updatedAt = result.user_updatedAt;
    user.username = result.user_username;
    user.status = result.user_status;
    user.balance = result.user_balance;
    record.user = user;
    record.amount = result.record_amount;
    return record;
  }

  async create(recordDto: AddRecordDto, userDto: UserDto) {
    let recordResult;
    const user = await this.usersService.findById(userDto.id)
    let operationResponse;
    const operation = await Operation.findOne({ where: { id: recordDto.operationType } })

    if (user.balance - operation.cost < 0) {
      throw new HttpException("Not enough balance", HttpStatus.BAD_REQUEST)
    }
    switch (operation.type) {
      case OperationType.ADDITION: {
        operationResponse = recordDto.amount
        user.balance -= operation.cost
        break;
      }
      case OperationType.SUBTRACTION: {
        operationResponse = recordDto.amount
        user.balance -= operation.cost
        user.balance -= recordDto.amount
        break;
      }
      case OperationType.DIVISION: {
        operationResponse = recordDto.amount
        user.balance -= operation.cost
        user.balance -= operation.cost
        break;
      }
      case OperationType.MULTIPLICATION: {
        operationResponse = recordDto.amount
        user.balance -= operation.cost
        user.balance -= operation.cost
        break;
      }
      case OperationType.SQUARE_ROOT: {
        operationResponse = Math.sqrt(recordDto.amount)
        user.balance -= operation.cost
        break;
      }
      case OperationType.RANDOM_STRING: {
        const result = await axios.get('https://www.random.org/strings/?num=1&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new');
        operationResponse = result.data;
        user.balance -= operation.cost
        break;
      }
    }
    recordResult = await Record.save({
      amount: recordDto.amount,
      date: new Date(),
      operation: { id: operation.id },
      user: { id: userDto.id },
      userBalance: user.balance,
      operationResponse: String(operationResponse)
    })
    await this.usersService.update(userDto.id, user)
    return recordResult;
  }

  async findAll(offset: number, limit: number, userDto: UserDto, q: string, sort: string) {

    let builder = Record.createQueryBuilder("record")
      .innerJoinAndMapOne('user', User, "user", "record.userId = user.id")
      .innerJoinAndMapOne('operation', Operation, "operation", "record.operationId = operation.id")
      .orderBy('record.date', 'ASC')
      .andWhere(`user.id = '${userDto.id}'`)
      .andWhere(`record.isActive = true`)

    if (q) {
      builder = builder.andWhere(new Brackets(qb => {
        qb.where(`operation.type ILIKE '%${q}%'`)
          .orWhere(`record.operationResponse ILIKE '%${q}%'`)
      }))
    }


    let orderBy = sort;
    if (sort === "operation") {
      orderBy = "operation.type"
    }

    builder = builder.orderBy(orderBy, "ASC")

    const total = await builder.getCount()
    const result = await builder.offset(offset)
      .limit(limit).execute();
    const records = result.map(item => this.transform(item))
    return { result: records, offset, total };
  }

  async findById(id: string) {
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      throw new Error("Record does not exist.")
    }
    return record
  }

  findOne(id: string) {
    return Record.findOne({ where: { id } })
  }

  update(id: string, recordDto: RecordDto) {
    const record = plainToClass(Record, recordDto);
    return Record.update(id, record)
  }

  remove(id: string) {
    return Record.update(id, { isActive: false });
  }
}
