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
exports.ServiceRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enum_1 = require("../../shared/enum");
const service_request_entity_1 = require("../../shared/models/service-request.entity");
const error_response_dto_1 = require("../../shared/responses/error-response.dto");
const get_service_requests_dto_1 = require("../../shared/responses/get-service-requests.dto");
const typeorm_2 = require("typeorm");
const object_mapper_1 = require("object-mapper");
const service_request_mapper_1 = require("../../shared/mapper/service-request-mapper");
const service_request_response_dto_1 = require("../../shared/responses/service-request-response.dto");
const pagination_response_dto_1 = require("../../shared/responses/pagination-response.dto");
let ServiceRequestService = class ServiceRequestService {
    constructor(serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
    }
    async getServiceRequests(paginationInfo) {
        try {
            const [serviceRequests, totalResults] = await this.serviceRequestRepository.createQueryBuilder('serviceRequest')
                .leftJoin('serviceRequest.customer', 'customer')
                .orderBy('serviceRequest.createdAt', 'DESC')
                .skip((paginationInfo.pageNumber - 1) * paginationInfo.pageSize)
                .take(paginationInfo.pageSize)
                .getManyAndCount();
            const serviceRequestsDto = serviceRequests.map(serviceRequest => {
                const serviceRequestDto = new service_request_response_dto_1.ServiceRequestResponseDto();
                return (0, object_mapper_1.merge)(serviceRequest, serviceRequestDto, service_request_mapper_1.serviceRequestMapper);
            });
            const getServiceRequestsDto = new get_service_requests_dto_1.GetServiceRequestsResponseDto();
            getServiceRequestsDto.pagination = new pagination_response_dto_1.PaginationResponseDto(paginationInfo.pageNumber, totalResults, paginationInfo.pageSize);
            getServiceRequestsDto.results = serviceRequestsDto;
            return getServiceRequestsDto;
        }
        catch (err) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.SISTEMIC_ERROR, enum_1.ErrorMessages.SISTEMIC_ERROR));
        }
    }
    async createServiceRequest(serviceRequestDto, userId, userStatus) {
        try {
            if (userStatus === enum_1.UserStatus.PENDING_ADDRESS) {
                return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.PENDING_ADDRESS, enum_1.ErrorMessages.PENDING_ADDRESS, common_1.HttpStatus.BAD_REQUEST));
            }
            const serviceRequestToBeInserted = new service_request_entity_1.ServiceRequest(serviceRequestDto.serviceName, serviceRequestDto.serviceDescription, serviceRequestDto.comments, this.getImageUrl());
            serviceRequestToBeInserted.addCustomerId(userId);
            await this.serviceRequestRepository.insert(serviceRequestToBeInserted);
        }
        catch (err) {
            return Promise.reject(new error_response_dto_1.ErrorResponseDto(enum_1.ErrorCodes.SISTEMIC_ERROR, enum_1.ErrorMessages.SISTEMIC_ERROR));
        }
    }
    getImageUrl() {
        return '';
    }
};
ServiceRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_request_entity_1.ServiceRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceRequestService);
exports.ServiceRequestService = ServiceRequestService;
//# sourceMappingURL=service-request.service.js.map