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
exports.GetUserCustomerServicesResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const detailed_customer_service_response_dto_1 = require("./detailed-customer-service-response.dto");
const pagination_response_dto_1 = require("./pagination-response.dto");
class GetUserCustomerServicesResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [detailed_customer_service_response_dto_1.DetailedCustomerServiceResponseDto]
    }),
    __metadata("design:type", Array)
], GetUserCustomerServicesResponseDto.prototype, "results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", pagination_response_dto_1.PaginationResponseDto)
], GetUserCustomerServicesResponseDto.prototype, "pagination", void 0);
exports.GetUserCustomerServicesResponseDto = GetUserCustomerServicesResponseDto;
//# sourceMappingURL=get-user-customer-services-response.dto.js.map