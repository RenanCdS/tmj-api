import { UserStatus } from 'src/shared/enum';
import { ServiceRequest } from 'src/shared/models/service-request.entity';
import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from 'src/shared/requests/create-customer-service-request.dto';
import { GetServiceRequestsResponseDto } from 'src/shared/responses/get-service-requests.dto';
import { Repository } from 'typeorm';
export declare class ServiceRequestService {
    private serviceRequestRepository;
    constructor(serviceRequestRepository: Repository<ServiceRequest>);
    getServiceRequests(paginationInfo: PaginationQuery): Promise<GetServiceRequestsResponseDto>;
    createServiceRequest(serviceRequestDto: CreateCustomerServiceRequestDto, userId: number, userStatus: UserStatus): Promise<never>;
    private getImageUrl;
}
