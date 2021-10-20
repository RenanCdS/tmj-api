import { ApiProperty } from "@nestjs/swagger";

export class AcceptUserServiceProposalRequestDto {
    @ApiProperty()
    proposalId: number;
    @ApiProperty()
    userServiceId: number;
}