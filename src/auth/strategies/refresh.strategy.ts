import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayloads';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';

/**
 * JWT Strategy for Passport authentication
 * This strategy validates JWT tokens in incoming requests
 */
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {

    /**
     * Constructor initializes the JWT strategy with configuration
     * @param jwtConfiguration - Configuration for JWT including secret key
     */
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret as string,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

  
    async validate(req:Request ,payload: AuthJwtPayload) {
        const authHeader = req.get("authorization");
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const refreshToken = authHeader.replace("Bearer" , "").trim();
        const userId = payload.sub;
        
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}