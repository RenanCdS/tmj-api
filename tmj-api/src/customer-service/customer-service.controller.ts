import { Body, Controller, Get, Param, Post, Query, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';
import { ServiceRequestService } from 'src/service/service-request/service-request.service';
import { PaginationQuery } from 'src/shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from 'src/shared/requests/create-customer-service-request.dto';
import { GetCustomerServiceByIdResponseDto } from 'src/shared/responses/get-customer-service-by-id-response.dto';
import { GetCustomerServiceResponseDto } from 'src/shared/responses/get-customer-service.dto';
import { GetUserCustomerServicesResponseDto } from 'src/shared/responses/get-user-customer-services-response.dto';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';

@ApiTags('customer-service')
@Controller('v1/customer-service')
export class CustomerServiceController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {
  }

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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Cria um novo serviço'
  })
  async createCustomerService(@Request() request, @Body() createCustomerServiceRequestDto: CreateCustomerServiceRequestDto,
                            @Res() response: Response) {
    try { 
      const userInfo = request.user;
      await this.serviceRequestService.createServiceRequest(createCustomerServiceRequestDto, userInfo.userId);

      return response.status(HttpStatus.CREATED).json();
    } catch (err) {
      if (err instanceof ErrorResponseDto)
        return response.status(err.statusCode).json(err);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json();
    }
  }
}

