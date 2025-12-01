import { Injectable } from '@nestjs/common'

@Injectable()
export class CsvService {
  toCsvStruct(data: any[]): string {
    if (data.length === 0)
      throw new Error('Array must contain at least one item.')

    const fields: string[] = Object.keys(data[0])
    const header: string = fields.join(',')

    const rows: string[] = data.map(row =>
      fields
        .map(f => JSON.stringify(row[f] ?? ''))
        .join(','))

    return [ header, ...rows ].join('\n')
  }
}
