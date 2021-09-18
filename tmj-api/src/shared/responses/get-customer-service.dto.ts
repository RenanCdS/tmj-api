import { ApiProperty } from "@nestjs/swagger";
import { CustomerServiceResponseDto } from "./customer-service-response.dto";
import { PaginationResponseDto } from "./pagination-response.dto";

export class GetCustomerServiceResponseDto {
    @ApiProperty({
        type: [CustomerServiceResponseDto]
    })
    results: CustomerServiceResponseDto[];
    @ApiProperty()
    pagination: PaginationResponseDto;
}