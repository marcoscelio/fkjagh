import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UserDto } from "src/users/dto/user.dto";

export class AuthDto {
  @ApiProperty({
    example: "admin@email.com",
    description: "User email",
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "123456",
    description: "User password",
  })
  @IsOptional()
  password: string;

}

export class LoginResponseDto extends UserDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImlkIjoiNTc1Y2U1YTgtODNlZi00OWQ5LThkMTAtYmY0ODhmNjA5OWI2Iiwicm9sZSI6ImFkbWluIiwic3ViIjp7InJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NTY4MDg3OTMsImV4cCI6MTY1NjgxMTc5M30.uCj2Ufg3Wsr6uVkuLW_0MJs5AdSWflHeLNwcOFm5KL0",
    description: "User access token",
  })
  @IsNotEmpty()
  accessToken: string;
}
