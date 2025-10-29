import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { AuthService } from './auth.service';
import * as auth from './messages/auth.json';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const session = await this.authService.login(body.email, body.password);
    console.log(session);

    const token = jwt.sign(
      { id: session.user.id, email: body.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.send({
      message: auth.connected,
    });
  }
}
