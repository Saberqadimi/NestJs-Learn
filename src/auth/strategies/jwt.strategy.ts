import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayloads';
import { AuthService } from '../auth.service';

/**
 * JWT Strategy for Passport authentication
 * This strategy validates JWT tokens in incoming requests
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     * Constructor initializes the JWT strategy with configuration
     * @param jwtConfiguration - Configuration for JWT including secret key
     */
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService:AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret as string,
            ignoreExpiration: false
        });
    }

    /**
     * Validates the JWT payload
     * @param payload - The decoded JWT payload
     * @returns An object containing the user ID from the payload
     */
    async validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}