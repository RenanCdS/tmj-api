import { ApiProperty } from "@nestjs/swagger";

export class ServiceRequestResponseDto {
    @ApiProperty()
    serviceName: string;
    @ApiProperty()
    serviceDescription: string;
    @ApiProperty()
    image: string;
    @ApiProperty()
    username: string;
}