import { IsNotEmpty, IsOptional } from "class-validator";

export class UserDto {

    @IsOptional()
    id?: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    balance?: number;
}

export class UpdateUserDto {

    @IsOptional()
    id?: string;

    @IsOptional()
    username?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    status?: string;

    @IsOptional()
    balance?: number;
}
