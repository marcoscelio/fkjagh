import { Controller, Get, Logger } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger
  ) {}

  @Get()
  healthCheck(): string {
    this.logger.debug("KK is running.", AppController.name);
    return this.appService.health();
  }
}
