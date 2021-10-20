import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodes, ErrorMessages, UserStatus } from '../../shared/enum';
import { ServiceRequest } from '../../shared/models/service-request.entity';
import { PaginationQuery } from '../../shared/query/pagination-query.dto';
import { CreateCustomerServiceRequestDto } from '../../shared/requests/create-customer-service-request.dto';
import { ErrorResponseDto } from '../../shared/responses/error-response.dto';
import { GetServiceRequestsResponseDto } from '../../shared/responses/get-service-requests.dto';
import { Repository } from 'typeorm';
import { merge } from 'object-mapper';
import { serviceRequestMapper } from '../../shared/mapper/service-request-mapper';
import { ServiceRequestResponseDto } from '../../shared/responses/service-request-response.dto';
import { PaginationResponseDto } from '../../shared/responses/pagination-response.dto';

@Injectable()
export class ServiceRequestService {
    constructor(@InjectRepository(ServiceRequest)
    private serviceRequestRepository: Repository<ServiceRequest>) {
    }

    async getServiceRequests(paginationInfo: PaginationQuery): Promise<GetServiceRequestsResponseDto> {
        try {
            const [serviceRequests, totalResults] = await this.serviceRequestRepository.createQueryBuilder('serviceRequest')
                .leftJoin('serviceRequest.customer', 'customer')
                .orderBy('serviceRequest.createdAt', 'DESC')
                .skip((paginationInfo.pageNumber - 1) * paginationInfo.pageSize)
                .take(paginationInfo.pageSize)
                .getManyAndCount();

            const serviceRequestsDto = serviceRequests.map(serviceRequest => {
                const serviceRequestDto = new ServiceRequestResponseDto();
                return merge<ServiceRequestResponseDto>(serviceRequest, serviceRequestDto, serviceRequestMapper);
            });

            const getServiceRequestsDto = new GetServiceRequestsResponseDto();
            getServiceRequestsDto.pagination = new PaginationResponseDto(paginationInfo.pageNumber, totalResults, paginationInfo.pageSize);

            getServiceRequestsDto.results = serviceRequestsDto;

            return getServiceRequestsDto;
        } catch (err) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.SISTEMIC_ERROR, ErrorMessages.SISTEMIC_ERROR));
        }
    }

    async createServiceRequest(serviceRequestDto: CreateCustomerServiceRequestDto, userId: number, userStatus: UserStatus) {
        try {
            if (userStatus === UserStatus.PENDING_ADDRESS) {
                return Promise.reject(new ErrorResponseDto(ErrorCodes.PENDING_ADDRESS, ErrorMessages.PENDING_ADDRESS, HttpStatus.BAD_REQUEST));
            }
            const serviceRequestToBeInserted = new ServiceRequest(serviceRequestDto.serviceName, serviceRequestDto.serviceDescription,
                serviceRequestDto.comments, this.getImageUrl());
            serviceRequestToBeInserted.addCustomerId(userId);

            await this.serviceRequestRepository.insert(serviceRequestToBeInserted);
        }
        catch (err) {
            return Promise.reject(new ErrorResponseDto(ErrorCodes.SISTEMIC_ERROR, ErrorMessages.SISTEMIC_ERROR));
        }
    }

    private getImageUrl(): string {
        return '';
    }
}
