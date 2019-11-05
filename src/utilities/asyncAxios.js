import axios from 'axios';
import { chain } from 'crocks/pointfree';
import { fromPromise } from 'crocks/Async';
import composeB from 'crocks/combinators/composeB';

export default composeB(chain(({data}) => data), fromPromise(axios));
