import { CanActivate, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  /**
   * Middleware for WS Auth
   * @param context
   */
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = verify(bearerToken, 'supersecret') as any;
      return new Promise((resolve, reject) => {
        return this.userService
          .findForUsername(decoded.username)
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              reject(false);
            }
          });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
