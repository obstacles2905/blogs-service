export type GetUsers = {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: GetUser[]
}

export type GetUser = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export enum MonthsEnum {
    January,
    February,
    March,
    April
}
