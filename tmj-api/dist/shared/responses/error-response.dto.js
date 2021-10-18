"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseDto = void 0;
class ErrorResponseDto {
    constructor(errorCode, errorMessage, statusCode = 500) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }
}
exports.ErrorResponseDto = ErrorResponseDto;
//# sourceMappingURL=error-response.dto.js.map