import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayloads';
import refreshJwtConfig from '../config/refresh-jwt.config';

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
        private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret as string,
            ignoreExpiration: false
        });
    }

    /**
     * Validates the JWT payload
     * @param payload - The decoded JWT payload
     * @returns An object containing the user ID from the payload
     */
    async validate(payload: AuthJwtPayload) {
        return { id: payload.sub };
    }
}