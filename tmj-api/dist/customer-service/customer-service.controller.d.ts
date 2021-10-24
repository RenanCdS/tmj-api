import { Response } from 'express';
import { ServiceRequestService } from '../service/service-request/service-request.service';
import { PaginationQuery } from '../shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from '../shared/requests/create-customer-service-request.dto';
import { GetServiceRequestsResponseDto } from '../shared/responses/get-service-requests.dto';
export declare class CustomerServiceController {
    private readonly serviceRequestService;
    constructor(serviceRequestService: ServiceRequestService);
    getCustomerServiceById(params: any): Promise<void>;
    getUserCustomerServices(): Promise<void>;
    getCustomerServices(paginationInfo: PaginationQuery): Promise<GetServiceRequestsResponseDto | Response<any, Record<string, any>>>;
    createCustomerService(request: any, createCustomerServiceRequestDto: CreateCustomerServiceRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
