"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const login_request_dto_1 = require("../../shared/requests/login-request.dto");
const login_response_dto_1 = require("../../shared/responses/login-response.dto");
const error_response_dto_1 = require("../../shared/responses/error-response.dto");
const enum_1 = require("../../shared/enum");
const hash_service_1 = require("../hash/hash.service");
const hash_entity_1 = require("../../shared/models/hash.entity");
const reset_password_request_dto_1 = require("../../shared/requests/reset-password-request.dto");
let AuthService = class AuthService {
    constructor(usersService, hashService, jwtService) {
        this.usersService = usersService;
        this.hashService = hashService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const userFromRepo = await this.usersService.getUserByEmail(loginDto.email);
        if (userFromRepo === null || userFromRepo === undefined) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.USER_OR_PASSWORD_INVALID, enum_1.ErrorMessages.USER_OR_PASSWORD_INVALID));
        }
        if (userFromRepo.userStatus === enum_1.UserStatus.PENDING_EMAIL) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.PENDING_EMAIL, enum_1.ErrorMessages.PENDING_EMAIL));
        }
        if (userFromRepo.userStatus === enum_1.UserStatus.BLOCKED) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.BLOCKED_USER, enum_1.ErrorMessages.BLOCKED_USER));
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, userFromRepo.password);
        if (isPasswordValid) {
            const payload = { username: userFromRepo.email, sub: userFromRepo.userId, role: userFromRepo.role, status: userFromRepo.userStatus };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.USER_OR_PASSWORD_INVALID, enum_1.ErrorMessages.USER_OR_PASSWORD_INVALID));
    }
    async requestPasswordReset(email) {
        try {
            const user = await this.usersService.getUserByEmail(email);
            if (user === null || user === undefined)
                return;
            const hashToInsert = new hash_entity_1.Hash();
            hashToInsert.user = user;
            hashToInsert.hashType = enum_1.HashType.PASSWORD_RESET;
            hashToInsert.expiration = new Date();
            hashToInsert.expiration
                .setMinutes(hashToInsert.expiration.getMinutes() + 20);
            hashToInsert.hash = this.hashService.generateHash();
            await this.hashService.saveHash(hashToInsert);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async resetPassword(resetPasswordRequest) {
        const hash = await this.hashService.findHash(resetPasswordRequest.hash);
        if (hash === null || hash === undefined) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.MISSING_HASH, enum_1.ErrorMessages.MISSING_HASH));
        }
        if (hash.expiration.getTime() <= new Date().getTime()) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.EXPIRED_HASH, enum_1.ErrorMessages.EXPIRED_HASH));
        }
        try {
            const user = await this.usersService.getUserByEmail(hash.user.email);
            user.password = await this.usersService.generatePassword(resetPasswordRequest.password, user.salt);
            await this.usersService.updateUser(user);
            await this.hashService.invalidateHash(hash);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        hash_service_1.HashService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map