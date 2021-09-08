export class ErrorResponseDto {
    errorCode: number;
    errorMessage: string;

    constructor(errorCode: number, errorMessage: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}