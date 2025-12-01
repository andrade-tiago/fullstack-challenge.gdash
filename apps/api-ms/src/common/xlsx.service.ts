import { Injectable } from '@nestjs/common'
import * as xlsx from 'xlsx'

@Injectable()
export class XlsxService {
  exportToXlsx(data: any[], sheetname = 'Sheet1'): Buffer {
    const worksheet = xlsx.utils.json_to_sheet(data)

    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetname)

    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' }) as Buffer

    return buffer
  }
}
