import { ApiProperty } from "@nestjs/swagger";

export class CreateUserServiceProposalRequestDto {
    @ApiProperty()
    profissionalId: number;
    @ApiProperty()
    serviceId: number;
    @ApiProperty()
    price: number;
    @ApiProperty()
    comment: string;
}