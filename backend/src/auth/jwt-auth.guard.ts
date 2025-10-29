import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import * as errors from './messages/errors.json';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = req.cookies?.access_token;
    console.log('token', token, 'req.cookies', req);

    if (!token) {
      throw new UnauthorizedException(errors.JWT_REQUIRED);
    }

    try {
      console.log('JWT', process.env.JWT_SECRET);
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret) as {
        id: string;
        email?: string;
      };

      req.user = { id: decoded.id, email: decoded.email };
      return true;
    } catch {
      throw new UnauthorizedException(errors.JWT_INVALID_EXPIRED);
    }
  }
}
