import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { OperationDto } from './dto/operation.dto';
import { Operation, OperationType } from './entities/operation.entity';
@Injectable()
export class OperationsService implements OnApplicationBootstrap {

  async create(operationDto: OperationDto) {
    const operation = plainToClass(Operation, operationDto);
    return Operation.save(operation);
  }

  findAll() {
    return Operation.find()
  }

  async findById(id: string) {
    const operation = await Operation.findOne({ where: { id } });
    if (!operation) {
      throw new Error("Operation does not exist.")
    }
    return operation
  }

  findOne(id: string) {
    return Operation.findOne({ where: { id } })
  }

  update(id: string, operationDto: OperationDto) {
    const operation = plainToClass(Operation, operationDto);
    return Operation.update(id, operation)
  }

  remove(id: string) {
    return Operation.delete(id);
  }


  addOperation = async (operation: string) => {
    const result = await Operation.findOne({ where: { type: operation } });
    if (!result) {
      await Operation.save({ type: operation })
    }
  }

  async onApplicationBootstrap() {
    const operations = [];
    operations.push({ type: OperationType.ADDITION, cost: 1, } as Operation)
    operations.push({ type: OperationType.SUBTRACTION, cost: 2, } as Operation)
    operations.push({ type: OperationType.DIVISION, cost: 3, } as Operation)
    operations.push({ type: OperationType.MULTIPLICATION, cost: 4, } as Operation)
    operations.push({ type: OperationType.SQUARE_ROOT, cost: 5, } as Operation)
    operations.push({ type: OperationType.RANDOM_STRING, cost: 7, } as Operation)

    for (const operation of operations) {
      const existingOperation = await Operation.findOne({
        where: {
          type: operation.type
        }
      })
      if (!existingOperation) {
        await Operation.save(operation)
      }

    }
  }

}
