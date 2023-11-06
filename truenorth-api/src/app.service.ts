import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): string {
    return 'Truenorth API Server is running';
  }
}
