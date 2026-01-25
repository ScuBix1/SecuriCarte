import { BadRequestException, Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase.client';
import auth from './messages/auth.json';

@Injectable()
export class AuthService {
  async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new BadRequestException(error.message);

    return data.user;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new BadRequestException(error.message);

    return data.user;
  }

  async getUser(accessToken: string) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) throw new BadRequestException(error.message);

    return data.user;
  }

  async sendPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.SITE_URL}/auth/reset-password`,
    });

    if (error) throw new Error(error.message);
    return { message: auth.emailResetSent };
  }

  async resetPassword(access_token: string, new_password: string) {
    const { data, error: userError } =
      await supabase.auth.getUser(access_token);
    if (userError || !data?.user) {
      throw new BadRequestException('Token invalide ou expiré.');
    }

    const { error } = await supabase.auth.admin.updateUserById(data.user.id, {
      password: new_password,
    });

    if (error) throw new BadRequestException(error.message);

    return {
      message: auth.passwordUpdated,
    };
  }
}
