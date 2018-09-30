// @flow

import {axiosGitHubGraphQL} from 'api/graphql';

export const loadReactIssues = (size: number, filter: string, offset: string) => {
    const REACT_ISSUES = `{
            repository(owner: "facebook", name:"react") {
                issues(
                    ${filter},
                    last: ${size},
                    ${offset}
                    ) {
                        nodes {
                            number
                            state
                            title
                            url
                            createdAt
                            closedAt
                            author {
                                login
                            }
                        }
                    
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    totalCount
                }
            }
        }`;
    return axiosGitHubGraphQL(REACT_ISSUES);
};
