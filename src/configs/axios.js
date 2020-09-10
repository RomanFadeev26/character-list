import axios from 'axios';
import { Deserializer } from 'jsonapi-serializer';
import { fromPromise } from 'crocks/Async';
import composeB from 'crocks/combinators/composeB';
import setProp from 'crocks/helpers/setProp';
import {cacheAdapter} from '../utilities/asyncAxios';

const { deserialize } = new Deserializer({keyForAttribute: 'camelCase'});

const JSONAPIAdapter = composeB(deserialize, JSON.parse);

export default function initAxiosConfig() {
    window.cache = cacheAdapter;
    axios.defaults.baseURL = 'http://localhost:8080';
    if (process.env.REACT_APP_MOCK_ON) {
        axios.defaults.baseURL = '/mocks';
        axios.interceptors.request.use(res => setProp('url', res.url + '.json', res));
    }
    axios.interceptors.response.use(response => {
        const baseUrlLength = response.config.baseURL.length + 1;
        const url = response.config.url.substring(baseUrlLength);
        const {config: {method}, data} = response;
        cacheAdapter.addCache({url, method, data});
        return response;
    });
    axios.defaults.validateStatus = (status) => status < 400;
    axios.defaults.timeout = 5000;
    axios.defaults.transformResponse = [
        fromPromise(JSONAPIAdapter)
    ];
}
