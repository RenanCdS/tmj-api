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
exports.UserAddress = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let UserAddress = class UserAddress extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "userAddressId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.userAddresses),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", user_entity_1.User)
], UserAddress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "addressId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address, address => address.userAddress),
    __metadata("design:type", address_entity_1.Address)
], UserAddress.prototype, "address", void 0);
UserAddress = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_user_address' })
], UserAddress);
exports.UserAddress = UserAddress;
//# sourceMappingURL=user.address.entity.js.map