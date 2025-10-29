import { BadRequestException, Injectable } from '@nestjs/common';
import { supabase } from 'src/supabase/supabase.client';

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

    return data.session;
  }

  async getUser(accessToken: string) {
    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error) throw new BadRequestException(error.message);

    return data.user;
  }
}
