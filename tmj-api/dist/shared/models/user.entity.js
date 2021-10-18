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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enum");
const base_entity_1 = require("./base.entity");
const service_proposed_entity_1 = require("./service-proposed.entity");
const service_request_entity_1 = require("./service-request.entity");
const user_address_entity_1 = require("./user.address.entity");
const hash_entity_1 = require("./hash.entity");
let User = class User extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enum_1.UserStatus.ACTIVE }),
    __metadata("design:type", Number)
], User.prototype, "userStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_address_entity_1.UserAddress, userAddress => userAddress.user),
    __metadata("design:type", Array)
], User.prototype, "userAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_request_entity_1.ServiceRequest, serviceRequest => serviceRequest.customer),
    __metadata("design:type", service_request_entity_1.ServiceRequest)
], User.prototype, "serviceRequestCustomer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_request_entity_1.ServiceRequest, serviceRequest => serviceRequest.professional),
    __metadata("design:type", service_request_entity_1.ServiceRequest)
], User.prototype, "serviceRequestProfessional", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_proposed_entity_1.ServiceProposed, serviceProposed => serviceProposed.professional),
    __metadata("design:type", Array)
], User.prototype, "servicesProposed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hash_entity_1.Hash, hash => hash.user),
    __metadata("design:type", Array)
], User.prototype, "hashes", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_user' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map