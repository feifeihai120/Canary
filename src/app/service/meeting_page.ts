import { Meeting } from './meeting'
export class MeetingPage {
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    total: number;
    pages: number;
    list: Meeting[];
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