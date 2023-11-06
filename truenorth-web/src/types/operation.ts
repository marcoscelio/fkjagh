export enum OperationType {
    ADDITION = "addition",
    SUBTRACTION = "subtraction",
    MULTIPLICATION = "multiplication",
    DIVISION = "division",
    SQUARE_ROOT = "square_root",
    RANDOM_STRING = "random_string"
}

export const operationTypes = ["addition", "subtraction", "multiplication", "division", "square_root", "random_string"]

export interface Operation {
    type: string;
    cost: number;
}

export interface UpdateOperation {
    id: string;
    type: string;
    cost: number;
}

export interface OperationResponse {
    id: string;
    createAt: Date;
    updatedAt: Date;
    type: string;
    cost: number;
}