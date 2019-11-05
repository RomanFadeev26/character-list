import axios from 'axios';
import { Deserializer } from 'jsonapi-serializer';
import { fromPromise } from 'crocks/Async';
import composeB from 'crocks/combinators/composeB';

const { deserialize } = new Deserializer({keyForAttribute: 'camelCase'});

const JSONAPIAdapter = composeB(deserialize, JSON.parse);

export default function initAxiosConfig() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.validateStatus = (status) => status < 400;
    axios.defaults.timeout = 5000;
    axios.defaults.transformResponse = [
        fromPromise(JSONAPIAdapter)
    ]
}