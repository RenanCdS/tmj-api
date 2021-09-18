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
}