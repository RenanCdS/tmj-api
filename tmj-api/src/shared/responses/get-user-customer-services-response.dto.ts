import { ApiProperty } from "@nestjs/swagger";
import { DetailedCustomerServiceResponseDto } from "./detailed-customer-service-response.dto";
import { PaginationResponseDto } from "./pagination-response.dto";

export class GetUserCustomerServicesResponseDto {
    @ApiProperty({
        type: [DetailedCustomerServiceResponseDto]
    })
    results: DetailedCustomerServiceResponseDto[];
    @ApiProperty()
    pagination: PaginationResponseDto;
}