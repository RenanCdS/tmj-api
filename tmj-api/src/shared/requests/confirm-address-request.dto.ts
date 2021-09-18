import { ApiProperty } from "@nestjs/swagger";

export class ConfirmAddressRequestDto {
    @ApiProperty()
    streetName: string;
    @ApiProperty()
    districtName: string;
    @ApiProperty()
    number: number;
    @ApiProperty()
    postalCode: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    latitude: string;
    @ApiProperty()
    longitude: string;
}