// @flow

import axios from 'axios';
import {history} from 'history';

export const axiosGitHubGraphQL = (query: string) => {
    const client = axios.create({
        baseURL: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Basic ${localStorage.getItem('btoa') || ''}`
        }
    });
    return client.post('', {query}).catch((error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('btoa');
            history.push('/');
        }
    });
};
