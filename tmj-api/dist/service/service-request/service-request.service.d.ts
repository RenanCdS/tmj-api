import { UserStatus } from '../../shared/enum';
import { ServiceRequest } from '../../shared/models/service-request.entity';
import { PaginationQuery } from '../../shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from '../../shared/requests/create-customer-service-request.dto';
import { GetServiceRequestsResponseDto } from '../../shared/responses/get-service-requests.dto';
import { Repository } from 'typeorm';
export declare class ServiceRequestService {
    private serviceRequestRepository;
    constructor(serviceRequestRepository: Repository<ServiceRequest>);
    getServiceRequests(paginationInfo: PaginationQuery): Promise<GetServiceRequestsResponseDto>;
    createServiceRequest(serviceRequestDto: CreateCustomerServiceRequestDto, userId: number, userStatus: UserStatus): Promise<never>;
    private getImageUrl;
}
