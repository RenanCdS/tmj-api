import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PaginationQuery } from "../query/pagination-query.dto";

@Injectable()
export class PaginationPipe implements PipeTransform<PaginationQuery, PaginationQuery> {
    transform(paginationInfo: PaginationQuery, metadata: ArgumentMetadata): PaginationQuery {
        if ((paginationInfo.pageNumber === 0 || paginationInfo.pageNumber === undefined) || (paginationInfo.pageSize === 0 || paginationInfo.pageSize === undefined)) {
            return { pageNumber: 1, pageSize: 5 };
        }
        return { pageSize: Number(paginationInfo.pageSize), pageNumber: Number(paginationInfo.pageNumber) };
    }

}