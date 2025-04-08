import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayloads';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('User not found!');

        const isPasswordMatched = await compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Invalid Credentials");

        return { id: user.id };
    }


    login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };

        return this.jwtService.sign(payload);
    }

}
