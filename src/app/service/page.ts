export class Page {
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    total: number;
    pages: number;
    list: Object[];
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}