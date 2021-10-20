import { ApiProperty } from "@nestjs/swagger";

export class GetCustomerServiceByIdResponseDto {
    @ApiProperty()
    serviceName: string;
    @ApiProperty()
    serviceDescription: string;
    @ApiProperty()
    imageUrl: string;
    @ApiProperty()
    username: string;
}