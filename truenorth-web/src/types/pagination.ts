
export interface Pagination {
    offset: number;
    limit: number;
    order?: string;
    filter?: string;
    sort?: string;
}