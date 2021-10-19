import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from '../shared/query/pagination-query.dto';
import { AcceptUserServiceProposalRequestDto } from '../shared/requests/accept-user-service-proposal-request.dto';
import { CreateUserServiceProposalRequestDto } from '../shared/requests/create-user-service-proposal-request.dto';
import { GetUserServiceProposalsDto } from '../shared/responses/get-user-service-proposals.dto';

@ApiTags('proposal')
@Controller('v1/proposal')
export class ProposalController {

  /** TODO: Pegar id do usuário pelo token  */
  /** @description Recupera as propostas de um serviço de um usuário */
  @Get(':serviceId')
  @ApiParam({ name: 'serviceId', required: true, description: 'id do serviço' })
  @ApiOkResponse({
    type: GetUserServiceProposalsDto,
    description: 'Recupera propostas de um serviço'
  })
  async getUserServiceProposals(@Param() params, @Query() paginationInfo: PaginationQuery) {
  }

  /**@description teste */
  @Patch()
  @ApiBody({
    type: AcceptUserServiceProposalRequestDto,
    description: 'Aceita a proposta de um profissional'
  })
  @ApiOkResponse()
  async acceptUserServiceProposal(@Body() acceptUserServiceProposalDto: AcceptUserServiceProposalRequestDto) {
  }

  @Post()
  @ApiBody({
    type: CreateUserServiceProposalRequestDto,
    description: 'Cria uma proposta de um profissional'
  })
  @ApiOkResponse()
  async createUserServiceProposal(@Body() createUserServiceProposalDto: CreateUserServiceProposalRequestDto) {
  }
}
