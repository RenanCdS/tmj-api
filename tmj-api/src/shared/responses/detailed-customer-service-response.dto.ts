import { ApiProperty } from "@nestjs/swagger";

export class DetailedCustomerServiceResponseDto {
    @ApiProperty()
    serviceName: string;
    @ApiProperty()
    serviceDescription: string;
    @ApiProperty()
    imageUrl: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    numberOfProposals: number;
    @ApiProperty()
    creationDate: Date;
    @ApiProperty()
    status: string;
}