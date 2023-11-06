import { IsNotEmpty, IsOptional } from "class-validator";

export class RecordDto {

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    operationId: string;

    @IsNotEmpty()
    operationResponse: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    userBalance: number;

    @IsNotEmpty()
    date: Date;

}


export class AddRecordDto {

    @IsNotEmpty()
    operationType: string;

    @IsNotEmpty()
    amount: number;

}
