import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
import { AcceptUserServiceProposalRequestDto } from 'src/shared/requests/accept-user-service-proposal-request.dto';
import { CreateUserServiceProposalRequestDto } from 'src/shared/requests/create-user-service-proposal-request.dto';
export declare class ProposalController {
    getUserServiceProposals(params: any, paginationInfo: PaginationQuery): Promise<void>;
    acceptUserServiceProposal(acceptUserServiceProposalDto: AcceptUserServiceProposalRequestDto): Promise<void>;
    createUserServiceProposal(createUserServiceProposalDto: CreateUserServiceProposalRequestDto): Promise<void>;
}
