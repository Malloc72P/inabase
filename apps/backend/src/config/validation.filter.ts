import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InvalidFieldException } from '@src/exceptions/invalid-field.exception';
import { Response } from 'express';

@Catch(InvalidFieldException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(error: InvalidFieldException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json(error.toJson());
  }
}
