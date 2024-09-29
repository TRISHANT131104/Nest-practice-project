import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExamampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example middleware');
    console.log(req.headers.authorization);

    const { authorization } = req.headers;

    if (!authorization)
      throw new HttpException('No authorization token', HttpStatus.FORBIDDEN);

    if (authorization === 'abcd') next();
    else
      throw new HttpException(
        'Invalid Authorisation token',
        HttpStatus.FORBIDDEN,
      );
  }
}
