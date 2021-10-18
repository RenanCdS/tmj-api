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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pagination_query_dto_1 = require("../shared/query/pagination-query.dto");
const accept_user_service_proposal_request_dto_1 = require("../shared/requests/accept-user-service-proposal-request.dto");
const create_user_service_proposal_request_dto_1 = require("../shared/requests/create-user-service-proposal-request.dto");
const get_user_service_proposals_dto_1 = require("../shared/responses/get-user-service-proposals.dto");
let ProposalController = class ProposalController {
    async getUserServiceProposals(params, paginationInfo) {
    }
    async acceptUserServiceProposal(acceptUserServiceProposalDto) {
    }
    async createUserServiceProposal(createUserServiceProposalDto) {
    }
};
__decorate([
    (0, common_1.Get)(':serviceId'),
    (0, swagger_1.ApiParam)({ name: 'serviceId', required: true, description: 'id do serviço' }),
    (0, swagger_1.ApiOkResponse)({
        type: get_user_service_proposals_dto_1.GetUserServiceProposalsDto,
        description: 'Recupera propostas de um serviço'
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_query_dto_1.PaginationQuery]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "getUserServiceProposals", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({
        type: accept_user_service_proposal_request_dto_1.AcceptUserServiceProposalRequestDto,
        description: 'Aceita a proposta de um profissional'
    }),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accept_user_service_proposal_request_dto_1.AcceptUserServiceProposalRequestDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "acceptUserServiceProposal", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        type: create_user_service_proposal_request_dto_1.CreateUserServiceProposalRequestDto,
        description: 'Cria uma proposta de um profissional'
    }),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_service_proposal_request_dto_1.CreateUserServiceProposalRequestDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "createUserServiceProposal", null);
ProposalController = __decorate([
    (0, swagger_1.ApiTags)('proposal'),
    (0, common_1.Controller)('v1/proposal')
], ProposalController);
exports.ProposalController = ProposalController;
//# sourceMappingURL=proposal.controller.js.map