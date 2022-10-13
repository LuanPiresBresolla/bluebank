import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../config/auth';
import { AppError } from '../../errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  user: boolean;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não encontrado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.secretKey);

    const { sub } = decoded as ITokenPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    console.log(error);
    throw new AppError('Token inválido', 401);
  }
}
