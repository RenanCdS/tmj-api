import { ApiProperty } from "@nestjs/swagger";

export class ProposalResponseDto {
    @ApiProperty()
    userId: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    userRating: number;
    @ApiProperty()
    price: number;
}