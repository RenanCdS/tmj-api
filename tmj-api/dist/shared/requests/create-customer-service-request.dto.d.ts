/// <reference types="multer" />
export declare class CreateCustomerServiceRequestDto {
    serviceName: string;
    serviceDescription: string;
    comments: string;
    image: Express.Multer.File;
}
