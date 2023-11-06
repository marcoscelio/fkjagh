import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "admin@email.com",
    description: "Username",
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "215631754",
    description: "User password",
  })
  @IsNotEmpty()
  password: string;

}

export class RegisterResponseDto {
  @ApiProperty({
    example: "uername1",
    description: "Username",
  })
  @IsNotEmpty()
  username: string;
}
