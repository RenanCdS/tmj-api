export class ErrorResponseDto {
    errorCode: number;
    errorMessage: string;
    statusCode: number;

    constructor(errorCode: number, errorMessage: string, statusCode = 500) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }
}