export declare class PaginationResponseDto {
    currentPage: number;
    previousPage: number;
    nextPage: number;
    totalPages: number;
    constructor(currentPage: number, totalResults: number, pageSize: number);
}
