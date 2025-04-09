import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

/**
 * Authentication Module
 * Handles user authentication, JWT token generation, and validation
 */
@Module({
  imports: [
    // Register User entity with TypeORM for database operations
    TypeOrmModule.forFeature([User]),
    
    // Configure JWT module with async configuration
    JwtModule.registerAsync(jwtConfig.asProvider()),
    
    // Load JWT configuration
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig)
  ],
  
  // Controllers that handle authentication endpoints
  controllers: [AuthController],
  
  // Services and strategies for authentication
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule { }

