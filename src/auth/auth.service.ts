import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(data: AuthInput): Promise<AuthType> {
        const user = await this.userService.findUserByUsername(data.usuario);

        if (!user) {
            throw new UnauthorizedException(`Usuário ou senha inválidos`);
        }

        const validPassword = compareSync(data.senha, user.senha);

        if (!validPassword) {
            throw new UnauthorizedException(`Senha inválida`);
        }

        const token = await this.jwtToken(user);

        return {
            user,
            token
        }
    }

    private async jwtToken(user: User): Promise<string> {
        const payload = { username: user.usuario, sub: user.id };
        return this.jwtService.signAsync(payload);
    }
}