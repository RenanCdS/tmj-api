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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../service/auth/auth.service");
const login_request_dto_1 = require("../shared/requests/login-request.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const email_service_1 = require("../service/email/email.service");
const password_reset_request_dto_1 = require("../shared/requests/password-reset-request.dto");
const reset_password_request_dto_1 = require("../shared/requests/reset-password-request.dto");
const swagger_1 = require("@nestjs/swagger");
const login_response_dto_1 = require("../shared/responses/login-response.dto");
let AuthController = class AuthController {
    constructor(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    async login(loginDto, response) {
        try {
            const token = await this.authService.login(loginDto);
            return response.status(common_1.HttpStatus.OK).json(token);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        }
    }
    async requestPasswordReset(passwordResetRequest, response) {
        try {
            await this.authService.requestPasswordReset(passwordResetRequest.email);
            return response.status(common_1.HttpStatus.CREATED).json();
        }
        catch (err) {
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
    async resetPassword(resetPasswordRequestDto, response) {
        try {
            await this.authService.resetPassword(resetPasswordRequestDto);
            return response.status(common_1.HttpStatus.OK).json();
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        }
    }
    async getHello(req) {
        console.log(req.user);
        this.emailService.sendEmail();
        return 'Hello World!';
    }
};
__decorate([
    (0, common_1.Post)('/auth/login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: login_response_dto_1.LoginResponseDto,
        description: 'Realiza login'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_request_dto_1.LoginRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/password-reset'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Envia o e-mail de reset de senha para o usuário'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [password_reset_request_dto_1.PasswordResetRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Patch)('auth/password-reset'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Realiza a troca de senha'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_request_dto_1.ResetPasswordRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('hello-world'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getHello", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('/v1'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_service_1.EmailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map