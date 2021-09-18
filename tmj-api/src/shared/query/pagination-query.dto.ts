import { ApiProperty } from "@nestjs/swagger";

export class PaginationQuery {
    @ApiProperty()
    pageNumber: number;
    @ApiProperty()
    pageSize: number;
}