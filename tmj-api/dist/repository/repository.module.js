"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("../shared/models/address.entity");
const service_proposed_entity_1 = require("../shared/models/service-proposed.entity");
const service_request_entity_1 = require("../shared/models/service-request.entity");
const user_address_entity_1 = require("../shared/models/user.address.entity");
const user_entity_1 = require("../shared/models/user.entity");
const hash_entity_1 = require("../shared/models/hash.entity");
const email_entity_1 = require("../shared/models/email.entity");
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                address_entity_1.Address,
                service_proposed_entity_1.ServiceProposed,
                service_request_entity_1.ServiceRequest,
                user_address_entity_1.UserAddress,
                email_entity_1.Email,
                hash_entity_1.Hash
            ])
        ],
        exports: [typeorm_1.TypeOrmModule]
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map