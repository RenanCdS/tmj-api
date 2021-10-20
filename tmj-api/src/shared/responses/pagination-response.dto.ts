import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseDto {
    @ApiProperty()
    currentPage: number;
    @ApiProperty()
    previousPage: number;
    @ApiProperty()
    nextPage: number;
    @ApiProperty()
    totalPages: number;

    constructor(currentPage: number, totalResults: number, pageSize: number) {
       this.currentPage = currentPage;
       this.totalPages = Math.ceil(totalResults / pageSize);

       if (this.totalPages > this.currentPage) {
            this.nextPage = currentPage + 1;
       } else {
            this.nextPage = null;
       }

       if (this.currentPage > 1) {
            this.previousPage = currentPage - 1;
       } else {
            this.previousPage = null;
       }
    }
}