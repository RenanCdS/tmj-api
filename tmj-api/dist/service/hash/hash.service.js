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
exports.HashService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = require("crypto");
const enum_1 = require("../../shared/enum");
const hash_entity_1 = require("../../shared/models/hash.entity");
const typeorm_2 = require("typeorm");
let HashService = class HashService {
    constructor(hashRepository) {
        this.hashRepository = hashRepository;
    }
    generateHash() {
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        return crypto.createHash('sha1').update(current_date + random).digest('hex');
    }
    async saveHash(hash) {
        try {
            await this.hashRepository.insert(hash);
        }
        catch (_a) {
            return Promise.reject();
        }
    }
    async findHash(hash) {
        const userHash = await this.hashRepository.findOne({ where: [
                { hash: hash },
                { isActive: true },
            ],
            order: {
                expiration: 'DESC'
            },
            relations: ['user']
        });
        return userHash;
    }
    async invalidateHash(hash) {
        hash.expiration = new Date();
        await this.hashRepository.save(hash);
    }
    async findLatestHashByUserId(userId, hash, hashType = enum_1.HashType.PASSWORD_RESET) {
        const userHash = await this.hashRepository.findOne({ where: [
                { hash: hash },
                { isActive: true },
                { userId: userId },
                { hashType: hashType }
            ],
            order: {
                expiration: 'DESC'
            } });
        return userHash;
    }
    async findLatestHashByEmail(email, hash, hashType = enum_1.HashType.PASSWORD_RESET) {
        const userHash = await this.hashRepository.findOne({ where: [
                { hash: hash },
                { isActive: true },
                { email },
                { hashType }
            ],
            order: {
                expiration: 'DESC'
            } });
        return userHash;
    }
};
HashService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hash_entity_1.Hash)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HashService);
exports.HashService = HashService;
//# sourceMappingURL=hash.service.js.map