import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Max, Min } from "class-validator"

export abstract class PaginationQuery {
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  pageNumber: number
}
