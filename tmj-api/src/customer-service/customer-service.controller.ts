import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
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
  })
  async getCustomerServiceById(@Param() params) {
  }

  @Get('mine')
  @ApiOkResponse({
    type: GetUserCustomerServicesResponseDto,
  })
  async getUserCustomerServices() {
  }

  @Get()
  @ApiOkResponse({
    type: GetCustomerServiceResponseDto,
  })
  async getCustomerServices(@Query() paginationInfo: PaginationQuery) {
  }
}
