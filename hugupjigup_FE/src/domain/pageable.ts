export type Pageable<T> = {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: T[];
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    },
    pageable: {
        offset: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        },
        paged: boolean;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
    },
    numberOfElements: number;
}
