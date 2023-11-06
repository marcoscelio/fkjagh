import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class GeneralDto {
  @ApiProperty({
    example: "",
    description: "Id da entidade.",
  })
  id: string;

  @ApiProperty({
    example: "true",
    description: "Flag para identificar entidade ativa.",
  })
  isActive: boolean;

  @ApiProperty({
    example: "2020-12-12",
    description: "Data de criação da entidade.",
  })
  @IsDateString()
  @IsOptional()
  createAt: string;

  @ApiProperty({
    example: "2020-12-12",
    description: "Data de última atualização da entidade.",
  })
  @IsDateString()
  @IsOptional()
  updatedAt: string;
}
