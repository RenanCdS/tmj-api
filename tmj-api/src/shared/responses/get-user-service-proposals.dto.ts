import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseDto } from "./pagination-response.dto";
import { ProposalResponseDto } from "./proposal-response.dto";

export class GetUserServiceProposalsDto {
    @ApiProperty({
        type: [ProposalResponseDto]
    })
    results: ProposalResponseDto[];
    @ApiProperty()
    pagination: PaginationResponseDto;
}