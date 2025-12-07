import { IsNumber, Max, Min } from "class-validator"

export abstract class PaginationQuery {
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number

  @IsNumber()
  @Min(1)
  pageNumber: number
}
