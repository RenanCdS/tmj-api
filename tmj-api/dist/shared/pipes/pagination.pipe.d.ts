import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { PaginationQuery } from "../query/pagination-query.dto";
export declare class PaginationPipe implements PipeTransform<PaginationQuery, PaginationQuery> {
    transform(paginationInfo: PaginationQuery, metadata: ArgumentMetadata): PaginationQuery;
}
