import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { type Request, type Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import * as auth from './messages/auth.json';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('me')
  getMe(@Req() req: Request) {
    const token = req.cookies['access_token'];
    if (!token) return { loggedIn: false };

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return { loggedIn: true, user: payload };
    } catch {
      return { loggedIn: false };
    }
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.login(body.email, body.password);

    const token = jwt.sign(
      { id: user.id, email: body.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.send({
      message: auth.connected,
    });
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.sendPasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: { access_token: string; new_password: string },
  ) {
    const { access_token, new_password } = body;

    return this.authService.resetPassword(access_token, new_password);
  }
}
