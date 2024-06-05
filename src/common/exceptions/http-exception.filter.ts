import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.statusCode;
    const message = exception.message;

    const body = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      endpoint: request.url,
    };

    this.logger.warn(`${statusCode} ${message}`);

    response.status(statusCode).json(body);
  }
}
