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
exports.ServiceRequest = void 0;
const typeorm_1 = require("typeorm");
const enum_1 = require("../enum");
const base_entity_1 = require("./base.entity");
const service_proposed_entity_1 = require("./service-proposed.entity");
const user_entity_1 = require("./user.entity");
let ServiceRequest = class ServiceRequest extends base_entity_1.Base {
    constructor(serviceName, serviceDescription, comments, image) {
        super();
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.comments = comments;
        this.image = image;
    }
    addCustomerId(customerId) {
        this.customerId = customerId;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "serviceRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceRequest.prototype, "serviceName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceRequest.prototype, "serviceDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enum_1.ServiceRequestStatus.ACTIVE }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceRequest.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceRequest.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "finalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ServiceRequest.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.serviceRequestCustomer),
    (0, typeorm_1.JoinColumn)({ name: "customerId" }),
    __metadata("design:type", user_entity_1.User)
], ServiceRequest.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.serviceRequestProfessional),
    (0, typeorm_1.JoinColumn)({ name: "professionalId" }),
    __metadata("design:type", user_entity_1.User)
], ServiceRequest.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_proposed_entity_1.ServiceProposed, serviceProposed => serviceProposed.serviceRequest),
    __metadata("design:type", Array)
], ServiceRequest.prototype, "servicesProposed", void 0);
ServiceRequest = __decorate([
    (0, typeorm_1.Entity)({ name: 'tb_service_request' }),
    __metadata("design:paramtypes", [String, String, String, String])
], ServiceRequest);
exports.ServiceRequest = ServiceRequest;
//# sourceMappingURL=service-request.entity.js.map