// @flow

import {axiosGitHubGraphQL} from 'api/graphql';

export const loadReactIssues = (size: number, filter: string) => {
    const REACT_ISSUES = `{
            repository(owner: "facebook", name:"react") {
                issues(
                    ${filter},
                    last: ${size}
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
                        hasNextPage
                        hasPreviousPage
                    }
                    totalCount
                }
            }
        }`;
    return axiosGitHubGraphQL(REACT_ISSUES);
};
