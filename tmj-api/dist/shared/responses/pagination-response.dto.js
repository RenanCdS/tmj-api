"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationResponseDto {
    constructor(currentPage, totalResults, pageSize) {
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(totalResults / pageSize);
        if (this.totalPages > this.currentPage) {
            this.nextPage = currentPage + 1;
        }
        else {
            this.nextPage = null;
        }
        if (this.currentPage > 1) {
            this.previousPage = currentPage - 1;
        }
        else {
            this.previousPage = null;
        }
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "currentPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "previousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "nextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "totalPages", void 0);
exports.PaginationResponseDto = PaginationResponseDto;
//# sourceMappingURL=pagination-response.dto.js.map