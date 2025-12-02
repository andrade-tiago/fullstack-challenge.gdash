import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { XlsxService } from "./xlsx.service";
import { CsvService } from "./csv.service";
import { IaService } from "./ia.service";

@Global()
@Module({
  providers: [PasswordService, XlsxService, CsvService, IaService],
  exports: [PasswordService, XlsxService, CsvService, IaService],
})
export class CommonModule {}
