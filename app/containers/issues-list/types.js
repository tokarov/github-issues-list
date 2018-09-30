// @flow

export type IssueType = {
    author: {
        login: string
    },
    closedAt: ?string,
    createdAt: string,
    number: number,
    state: string,
    title: string,
    url: string
}

export type PaginationType = {
    hasNextPage: Boolean,
    hasPreviousPage: Boolean,
    size: number,
    totalCount: number,
    endCursor: string,
    startCursor: string,
    offset: string
}

export type FilterType = {
    states: Array<string>
};
