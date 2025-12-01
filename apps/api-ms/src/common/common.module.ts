import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./password.service";
import { XlsxService } from "./xlsx.service";

@Global()
@Module({
  providers: [PasswordService, XlsxService],
  exports: [PasswordService, XlsxService],
})
export class CommonModule {}
