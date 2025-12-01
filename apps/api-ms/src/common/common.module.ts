import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { XlsxService } from "./xlsx.service";
import { CsvService } from "./csv.service";

@Global()
@Module({
  providers: [PasswordService, XlsxService, CsvService],
  exports: [PasswordService, XlsxService, CsvService],
})
export class CommonModule {}
