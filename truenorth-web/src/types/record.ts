import { UserResponse } from "./User";


export interface AddRecord {
    operationType: string;
    amount: number;
}

export interface Record {
    id: string;
    operation: OperationResponse;
    user: UserResponse;
    operationResponse: string;
    amount: number;
    userBalance: number;
    date: Date;
}

export interface RecordResponse {
    result: Record[];
    offset: number;
    total: number;
}

export interface DeleteOperation {
    id: string;
}

export interface OperationResponse {
    id: string;
    createAt: Date;
    updatedAt: Date;
    type: string;
    cost: number;
}