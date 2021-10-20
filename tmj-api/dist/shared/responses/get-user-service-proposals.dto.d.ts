import { PaginationResponseDto } from "./pagination-response.dto";
import { ProposalResponseDto } from "./proposal-response.dto";
export declare class GetUserServiceProposalsDto {
    results: ProposalResponseDto[];
    pagination: PaginationResponseDto;
}
