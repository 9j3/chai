import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'

@Controller('/api')
export class AppController {
  /**
   *
   * @param req
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user
  }
}
