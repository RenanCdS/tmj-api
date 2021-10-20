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
exports.GetUserServiceProposalsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_response_dto_1 = require("./pagination-response.dto");
const proposal_response_dto_1 = require("./proposal-response.dto");
class GetUserServiceProposalsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [proposal_response_dto_1.ProposalResponseDto]
    }),
    __metadata("design:type", Array)
], GetUserServiceProposalsDto.prototype, "results", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", pagination_response_dto_1.PaginationResponseDto)
], GetUserServiceProposalsDto.prototype, "pagination", void 0);
exports.GetUserServiceProposalsDto = GetUserServiceProposalsDto;
//# sourceMappingURL=get-user-service-proposals.dto.js.map