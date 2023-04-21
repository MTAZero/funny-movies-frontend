import axios from 'axios';
import { getSessionKey } from '../storage';
import { ConfigServer } from '../../const';

const host = ConfigServer.host;
const port = ConfigServer.port;
let server = `${host}:${port}`;

console.log("server : ", server)

const _makeRequest = (instantAxios: any) => async (args: any) => {
    const _headers = args.headers ? args.headers : {};
    const body = args.body ? args.body : {};
    const defaultHeaders = {};
    args = {
        ...args,
        headers: {
            ...defaultHeaders,
            ..._headers,
        },
        body,
    };

    const request = instantAxios(args);

    return request
        .then((response: any) => response.data)
        .catch((error: any) => {
            throw error.response.data ? error.response.data : error.response;
        });
};

const _makeAuthRequest = (instantAxios: any) => async (args: any) => {
    const requestHeaders = args.headers ? args.headers : {};
    const accessToken = getSessionKey();

    let headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    args = {
        ...args,
        headers: {
            ...requestHeaders,
            ...headers,
        },
    };

    const request = instantAxios(args);

    return request
        .then((response: any) => response.data)
        .catch((error: any) => {
            throw {
                message: error.response.data
                    ? error.response.data
                    : error.response,
            };
        });
};

export default (options: any = {}) => {
    let BaseURL = server;

    if (options.BaseURL) BaseURL = options.BaseURL;

    //const baseUrlValidated = options.baseUrl || getEnv('baseAPIUrl')
    const instance = axios.create({
        // httpsAgent: new https.Agent({
        //     rejectUnauthorized: false,
        // }),
        baseURL: BaseURL,
        timeout: 30000,
    });

    return {
        makeRequest: _makeRequest(instance),
        makeAuthRequest: _makeAuthRequest(instance),
    };
};
