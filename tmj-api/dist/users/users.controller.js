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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user/user.service");
const create_user_request_dto_1 = require("../shared/requests/create-user-request.dto");
const enum_1 = require("../shared/enum");
const user_entity_1 = require("../shared/models/user.entity");
const error_response_dto_1 = require("../shared/responses/error-response.dto");
const swagger_1 = require("@nestjs/swagger");
const confirm_address_request_dto_1 = require("../shared/requests/confirm-address-request.dto");
const edit_user_info_request_dto_1 = require("../shared/requests/edit-user-info-request.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll() {
        return await this.userService.findAll();
    }
    async preRegisterUser(createUserRequestDto, response) {
        if (createUserRequestDto === null ||
            createUserRequestDto === undefined ||
            Object.keys(createUserRequestDto).length === 0) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json();
        }
        if (createUserRequestDto.genre !== enum_1.Genre.MALE &&
            createUserRequestDto.genre !== enum_1.Genre.FEMALE) {
            return response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.INVALID_GENRE, enum_1.ErrorMessages.INVALID_GENRE));
        }
        if (createUserRequestDto.role !== enum_1.Role.CLIENT &&
            createUserRequestDto.role !== enum_1.Role.PROFESSIONAL) {
            return response
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.INVALID_ROLE, enum_1.ErrorMessages.INVALID_ROLE));
        }
        const userToCreate = this.mapUserDtoToEntity(createUserRequestDto);
        try {
            await this.userService.preRegisterUserAsync(userToCreate);
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        }
        return response.status(common_1.HttpStatus.CREATED).json();
    }
    async confirmUserEmail(params, response) {
        try {
            await this.userService.confirmUserEmail(params.hash, params.userId);
            return response.status(common_1.HttpStatus.OK).json();
        }
        catch (err) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json(err);
        }
    }
    async confirmUserAddress(request, confirmAddressRequestDto, params, response) {
        try {
            const userInfo = request.user;
            await this.userService.confirUserAddress(userInfo.userId, confirmAddressRequestDto);
            return response.status(common_1.HttpStatus.OK).json();
        }
        catch (err) {
            if (err instanceof error_response_dto_1.ErrorResponseDto)
                return response.status(err.statusCode).json(err);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
    async editUserInfo(editUserInfoRequestDto, params, response) {
    }
    mapUserDtoToEntity(createUserRequestDto) {
        const user = new user_entity_1.User();
        user.name = createUserRequestDto.name;
        user.email = createUserRequestDto.email;
        user.password = createUserRequestDto.password;
        user.role = createUserRequestDto.role;
        user.cpf = createUserRequestDto.cpf;
        user.phone = createUserRequestDto.phone;
        user.genre = createUserRequestDto.genre;
        user.birthDate = createUserRequestDto.birthDate;
        return user;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Realiza o pré-registro do usuário, ou seja, usuário será criado com status de pendência de e-mail'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_request_dto_1.CreateUserRequestDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "preRegisterUser", null);
__decorate([
    (0, common_1.Patch)(':userId/:hash'),
    (0, swagger_1.ApiParam)({
        name: 'userId'
    }),
    (0, swagger_1.ApiParam)({
        name: 'hash'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Realiza a confirmação de e-mail'
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmUserEmail", null);
__decorate([
    (0, common_1.Patch)('address'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        description: 'Realiza o cadastro de endereço do usuário'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, confirm_address_request_dto_1.ConfirmAddressRequestDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmUserAddress", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOkResponse)({
        description: 'Edita as informações do usuário'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_user_info_request_dto_1.EditUserInfoRequestDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editUserInfo", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('v1/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map