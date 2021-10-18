"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPipe = void 0;
const common_1 = require("@nestjs/common");
let PaginationPipe = class PaginationPipe {
    transform(paginationInfo, metadata) {
        if ((paginationInfo.pageNumber === 0 || paginationInfo.pageNumber === undefined) || (paginationInfo.pageSize === 0 || paginationInfo.pageSize === undefined)) {
            return { pageNumber: 1, pageSize: 5 };
        }
        return { pageSize: Number(paginationInfo.pageSize), pageNumber: Number(paginationInfo.pageNumber) };
    }
};
PaginationPipe = __decorate([
    (0, common_1.Injectable)()
], PaginationPipe);
exports.PaginationPipe = PaginationPipe;
//# sourceMappingURL=pagination.pipe.js.map