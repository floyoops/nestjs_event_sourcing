import { LoggerService } from '@nestjs/common';

export class MyLoggerMock implements LoggerService {
  public errors: string[] = [];
  public logs: string[] = [];
  public warns: string[] = [];

  error(message: any, ...optionalParams: any[]): any {
    this.errors.push(message);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.logs.push(message);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.warns.push(message);
  }

  reset(): void {
    this.errors = [];
    this.logs = [];
    this.warns = [];
  }
}
