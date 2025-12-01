export class Pagination<T> {
  public readonly pageNumber: number
  public readonly pageSize: number
  public readonly totalCount: number
  public readonly totalPages: number
  public readonly data: ReadonlyArray<T>

  constructor(data: {
    pageNumber: number
    pageSize: number
    totalCount: number
    data: T[]
  }) {
    Object.assign(this, data)

    this.totalPages = Math.ceil(data.totalCount / data.pageSize)
  }
}
