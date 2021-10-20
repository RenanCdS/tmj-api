import { ApiProperty } from "@nestjs/swagger";
import { ServiceRequestResponseDto } from "./service-request-response.dto";
import { PaginationResponseDto } from "./pagination-response.dto";

export class GetServiceRequestsResponseDto {
    @ApiProperty({
        type: [ServiceRequestResponseDto]
    })
    results: ServiceRequestResponseDto[];
    @ApiProperty()
    pagination: PaginationResponseDto;
}