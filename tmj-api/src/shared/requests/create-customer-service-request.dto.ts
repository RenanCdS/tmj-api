import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerServiceRequestDto {
    @ApiProperty()
    serviceName: string;
    @ApiProperty()
    serviceDescription: string;
    @ApiProperty()
    image: Express.Multer.File;
}