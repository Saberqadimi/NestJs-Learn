import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayloads';

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
        private jwtConfiguration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret as string
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