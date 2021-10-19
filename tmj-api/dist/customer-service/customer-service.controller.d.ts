import { Response } from 'express';
import { ServiceRequestService } from 'src/service/service-request/service-request.service';
import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from 'src/shared/requests/create-customer-service-request.dto';
import { GetServiceRequestsResponseDto } from 'src/shared/responses/get-service-requests.dto';
export declare class CustomerServiceController {
    private readonly serviceRequestService;
    constructor(serviceRequestService: ServiceRequestService);
    getCustomerServiceById(params: any): Promise<void>;
    getUserCustomerServices(): Promise<void>;
    getCustomerServices(paginationInfo: PaginationQuery): Promise<Response<any, Record<string, any>> | GetServiceRequestsResponseDto>;
    createCustomerService(request: any, createCustomerServiceRequestDto: CreateCustomerServiceRequestDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
