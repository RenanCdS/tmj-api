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
exports.ServiceProposed = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const service_request_entity_1 = require("./service-request.entity");
const user_entity_1 = require("./user.entity");
let ServiceProposed = class ServiceProposed extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceProposed.prototype, "serviceProposedId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServiceProposed.prototype, "priceOffer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceProposed.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.servicesProposed),
    (0, typeorm_1.JoinColumn)({ name: 'professionalId' }),
    __metadata("design:type", user_entity_1.User)
], ServiceProposed.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_request_entity_1.ServiceRequest, serviceRequest => serviceRequest.servicesProposed),
    (0, typeorm_1.JoinColumn)({ name: 'serviceRequestId' }),
    __metadata("design:type", service_request_entity_1.ServiceRequest)
], ServiceProposed.prototype, "serviceRequest", void 0);
ServiceProposed = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_service_proposed' })
], ServiceProposed);
exports.ServiceProposed = ServiceProposed;
//# sourceMappingURL=service-proposed.entity.js.map