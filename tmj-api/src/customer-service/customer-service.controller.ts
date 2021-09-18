import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from 'src/shared/requests/create-customer-service-request.dto';
import { GetCustomerServiceByIdResponseDto } from 'src/shared/responses/get-customer-service-by-id-response.dto';
import { GetCustomerServiceResponseDto } from 'src/shared/responses/get-customer-service.dto';
import { GetUserCustomerServicesResponseDto } from 'src/shared/responses/get-user-customer-services-response.dto';

@ApiTags('customer-service')
@Controller('v1/customer-service')
export class CustomerServiceController {

  @Get(':id')
  @ApiParam({name: 'identifier', required: true, description: 'id do usuário'})
  @ApiOkResponse({
    type: GetCustomerServiceByIdResponseDto,
    description: 'Recupera algum serviço por Id'
  })
  async getCustomerServiceById(@Param() params) {
  }

  @Get('mine')
  @ApiOkResponse({
    type: GetUserCustomerServicesResponseDto,
    description: 'Recupera os serviços do usuário logado'
  })
  async getUserCustomerServices() {
  }

  @Get()
  @ApiQuery({
    type: PaginationQuery
  })
  @ApiOkResponse({
    type: GetCustomerServiceResponseDto,
    description: 'Recuperar os serviços existentes'
  })
  async getCustomerServices(@Query() paginationInfo: PaginationQuery) {
  }

  /** TODO: Recuperar id do usuário pelo token */
  @Post()
  @ApiOkResponse({
    description: 'Cria um novo serviço'
  })
  async createCustomerService(@Body() createCustomerServiceRequestDto: CreateCustomerServiceRequestDto) {
  }
}
