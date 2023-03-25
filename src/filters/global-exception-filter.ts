import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500

    response
      .status(200)
      .json({
        statusCode,
        statusText: exception.message || 'Internal server error'
      })
  }
}
