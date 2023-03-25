import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  private apiKey: string

  constructor() {
    dotenv.config()
    this.apiKey = process.env.API_KEY
  }

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key']
    if (apiKey !== this.apiKey) {
      res.status(200).send({
        statusCode: 401,
        statusText: 'Unauthorized'
      })
      return;
    }
    next()
  }
}
