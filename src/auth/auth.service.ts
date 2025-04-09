import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayloads';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from "argon2";
import { CurrentUser } from './types/current-user';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new UnauthorizedException('User not found!');

        const isPasswordMatched = await compare(password, user.password);
        if (!isPasswordMatched) throw new UnauthorizedException("Invalid Credentials");

        return { id: user.id };
    }


    async login(userId: number) {

        const { acceccToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            id: userId,
            acceccToken,
            refreshToken
        }
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [acceccToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig),
        ]);

        return {
            acceccToken,
            refreshToken
        }
    }

    async refreshToken(userId: number) {
        const { acceccToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            id: userId,
            acceccToken,
            refreshToken
        }
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashedRefreshToken) throw new UnauthorizedException('Invalid Refresh Token!');

        const refreshTokenMatches = await argon2.verify(
            user.hashedRefreshToken,
            refreshToken
        );

        if (!refreshTokenMatches) throw new UnauthorizedException('Invalid Refresh Token!');
        return { id: userId };
    }


    async signOut(userId: number) {
        await this.userService.updateHashedRefreshToken(userId, '');
    }


    async validateJwtUser(userId:number){
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException("User not Found!");
    
        const currentUser:CurrentUser = {id:user.id , role: user.role}
        
        return currentUser;
    }
}
