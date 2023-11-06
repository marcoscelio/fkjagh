import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { OperationType } from "../entities/operation.entity";
import { UserDto } from "src/users/dto/user.dto";

export class OperationDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    cost: number;

}
