import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodes, ErrorMessages } from 'src/shared/enum';
import { ServiceRequest } from 'src/shared/models/service-request.entity';
import { CreateCustomerServiceRequestDto } from 'src/shared/requests/create-customer-service-request.dto';
import { ErrorResponseDto } from 'src/shared/responses/error-response.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceRequestService {
    constructor(@InjectRepository(ServiceRequest)
        private serviceRequestRepository: Repository<ServiceRequest>) {
    }

    async createServiceRequest(serviceRequestDto: CreateCustomerServiceRequestDto, userId: number) {
        try {
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
