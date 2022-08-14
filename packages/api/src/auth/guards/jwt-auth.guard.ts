import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  /**
     * 
     * @param context
     */
  canActivate(context: ExecutionContext) {
    // TODO: Add custom authentication logic here
    return super.canActivate(context);
  }

  /**
     * 
     * @param err
     * @param user
     * @param info
     */
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}