import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get('health')
  async checkHealth() {
    return { status: 'ok' }
  }
}
