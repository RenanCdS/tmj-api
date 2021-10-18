import { ServiceRequestResponseDto } from "./service-request-response.dto";
import { PaginationResponseDto } from "./pagination-response.dto";
export declare class GetServiceRequestsResponseDto {
    results: ServiceRequestResponseDto[];
    pagination: PaginationResponseDto;
}
