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
exports.CustomerServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const express_1 = require("express");
const service_request_service_1 = require("../service/service-request/service-request.service");
const pagination_query_dto_1 = require("../shared/query/pagination-query.dto");
const create_customer_service_request_dto_1 = require("../shared/requests/create-customer-service-request.dto");
const get_customer_service_by_id_response_dto_1 = require("../shared/responses/get-customer-service-by-id-response.dto");
const get_user_customer_services_response_dto_1 = require("../shared/responses/get-user-customer-services-response.dto");
const error_response_dto_1 = require("../shared/responses/error-response.dto");
const get_service_requests_dto_1 = require("../shared/responses/get-service-requests.dto");
const pagination_pipe_1 = require("../shared/pipes/pagination.pipe");
let CustomerServiceController = class CustomerServiceController {
    constructor(serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }
    async getCustomerServiceById(params) {
    }
    async getUserCustomerServices() {
    }
    async getCustomerServices(paginationInfo) {
        try {
            const serviceRequests = await this.serviceRequestService.getServiceRequests(paginationInfo);
            return serviceRequests;
        }
        catch (err) {
            return express_1.response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
    async createCustomerService(request, createCustomerServiceRequestDto, response) {
        try {
            const userInfo = request.user;
            await this.serviceRequestService.createServiceRequest(createCustomerServiceRequestDto, userInfo.userId, userInfo.userStatus);
            return response.status(common_1.HttpStatus.CREATED).json();
        }
        catch (err) {
            if (err instanceof error_response_dto_1.ErrorResponseDto)
                return response.status(err.statusCode).json(err);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json();
        }
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'identifier', required: true, description: 'id do usuário' }),
    (0, swagger_1.ApiOkResponse)({
        type: get_customer_service_by_id_response_dto_1.GetCustomerServiceByIdResponseDto,
        description: 'Recupera algum serviço por Id'
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerServiceController.prototype, "getCustomerServiceById", null);
__decorate([
    (0, common_1.Get)('mine'),
    (0, swagger_1.ApiOkResponse)({
        type: get_user_customer_services_response_dto_1.GetUserCustomerServicesResponseDto,
        description: 'Recupera os serviços do usuário logado'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerServiceController.prototype, "getUserCustomerServices", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiQuery)({
        type: pagination_query_dto_1.PaginationQuery
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_service_requests_dto_1.GetServiceRequestsResponseDto,
        description: 'Recuperar os serviços existentes'
    }),
    __param(0, (0, common_1.Query)(new common_1.DefaultValuePipe({ pageSize: 5, pageNumber: 1 }), new pagination_pipe_1.PaginationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQuery]),
    __metadata("design:returntype", Promise)
], CustomerServiceController.prototype, "getCustomerServices", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        description: 'Cria um novo serviço'
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_customer_service_request_dto_1.CreateCustomerServiceRequestDto, Object]),
    __metadata("design:returntype", Promise)
], CustomerServiceController.prototype, "createCustomerService", null);
CustomerServiceController = __decorate([
    (0, swagger_1.ApiTags)('customer-service'),
    (0, common_1.Controller)('v1/customer-service'),
    __metadata("design:paramtypes", [service_request_service_1.ServiceRequestService])
], CustomerServiceController);
exports.CustomerServiceController = CustomerServiceController;
//# sourceMappingURL=customer-service.controller.js.map