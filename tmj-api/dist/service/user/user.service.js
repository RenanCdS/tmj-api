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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../shared/models/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const hash_entity_1 = require("../../shared/models/hash.entity");
const enum_1 = require("../../shared/enum");
const error_response_dto_1 = require("../../shared/responses/error-response.dto");
const hash_service_1 = require("../hash/hash.service");
const object_mapper_1 = require("object-mapper");
const address_mapper_1 = require("../../shared/mapper/address-mapper");
const address_entity_1 = require("../../shared/models/address.entity");
const user_address_entity_1 = require("../../shared/models/user.address.entity");
const email_service_1 = require("../email/email.service");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(configService, emailService, hashService, userRepository, userAddressRepository, addressRepository) {
        this.configService = configService;
        this.emailService = emailService;
        this.hashService = hashService;
        this.userRepository = userRepository;
        this.userAddressRepository = userAddressRepository;
        this.addressRepository = addressRepository;
    }
    findAll() {
        return this.userRepository.find({
            where: [
                { isActive: true }
            ]
        });
    }
    getUserByEmail(email) {
        return this.userRepository.findOne({ email, isActive: true });
    }
    async confirUserAddress(userId, confirmAddressDto) {
        await (0, typeorm_2.getConnection)().transaction(async (transactionEntityManager) => {
            let addressToInsert = new address_entity_1.Address();
            (0, object_mapper_1.merge)(confirmAddressDto, addressToInsert, address_mapper_1.addressMapper);
            await this.addressRepository.save(addressToInsert);
            const userAddressToInsert = new user_address_entity_1.UserAddress();
            userAddressToInsert.addressId = addressToInsert.addressId;
            userAddressToInsert.userId = userId;
            await this.userAddressRepository.save(userAddressToInsert);
            const user = await this.userRepository.findOne({ userId, isActive: true });
            user.userStatus = enum_1.UserStatus.ACTIVE;
            await this.userRepository.save(user);
        });
    }
    async confirmUserEmail(hash, userId) {
        const userHash = await this.hashService.findLatestHashByUserId(userId, hash, enum_1.HashType.EMAIL_CONFIRMATION);
        if (userHash !== null && userHash !== undefined) {
            if (userHash.expiration.getTime() <= new Date().getTime()) {
                return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.EXPIRED_HASH, enum_1.ErrorMessages.EXPIRED_HASH));
            }
            try {
                const user = await this.userRepository.findOne({ userId });
                user.userStatus = enum_1.UserStatus.PENDING_ADDRESS;
                await this.userRepository.save(user);
                userHash.expiration = new Date();
                await this.hashService.invalidateHash(userHash);
                return;
            }
            catch (err) {
                return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.SISTEMIC_ERROR, enum_1.ErrorMessages.SISTEMIC_ERROR));
            }
        }
        return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.MISSING_HASH, enum_1.ErrorMessages.MISSING_HASH));
    }
    async preRegisterUserAsync(user) {
        const userFromRepo = await this.userRepository.findOne({ email: user.email });
        if (userFromRepo !== null && userFromRepo !== undefined) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.USER_ALREADY_REGISTERED, enum_1.ErrorMessages.USER_ALREADY_REGISTERED));
        }
        const salt = await this.getSalt();
        user.salt = salt;
        const hashedPassword = await this.generatePassword(user.password, salt);
        user.password = hashedPassword;
        user.userStatus = enum_1.UserStatus.PENDING_EMAIL;
        await this.userRepository.insert(user);
        const confirmationEmailHash = new hash_entity_1.Hash();
        confirmationEmailHash.hash = this.hashService.generateHash();
        confirmationEmailHash.user = user;
        confirmationEmailHash.hashType = enum_1.HashType.EMAIL_CONFIRMATION;
        confirmationEmailHash.expiration = new Date();
        confirmationEmailHash.expiration
            .setMinutes(confirmationEmailHash.expiration.getMinutes() + 20);
        await this.hashService.saveHash(confirmationEmailHash);
        await this.sendConfirmationEmail(user, confirmationEmailHash.hash);
    }
    async generatePassword(password, salt) {
        return await this.hash(password, salt);
    }
    async updateUser(user) {
        await this.userRepository.save(user);
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
    async sendConfirmationEmail(user, hash) {
        const emailParameters = {
            '%LINK%': `${this.configService.get('WEB_URL')}/confirmacao-email/${user.userId}/${hash}`
        };
        await this.emailService.sendEmail(1, user.email, emailParameters);
    }
    async getSalt() {
        return await bcrypt.genSalt();
    }
    async hash(data, salt) {
        return await bcrypt.hash(data, salt);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(user_address_entity_1.UserAddress)),
    __param(5, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        email_service_1.EmailService,
        hash_service_1.HashService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map