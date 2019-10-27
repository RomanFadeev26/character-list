import * as appActionTypes from './actions/actionTypes';
import setPath from 'crocks/helpers/setPath';
import composeB from 'crocks/combinators/composeB';
import compose2 from 'crocks/combinators/compose2';

const LOADING_PROP = 'loading';

const LOADING_PATH = [LOADING_PROP, 'isLoading'];
const ERROR_PATH = [LOADING_PROP, 'isError'];

const setErrorStatus = setPath(ERROR_PATH);
const setLoadingStatus = setPath(LOADING_PATH);

const flow = (state, action) => action(state); 

const setLoadingMessage = setPath([LOADING_PROP, 'loadingMessage']);
const loadingStart = compose2(flow, setLoadingStatus(true), setLoadingMessage);
const loadingSuccess = composeB(setLoadingStatus(false), setErrorStatus(false));
const setErrorMessage = setPath([LOADING_PROP, 'errorMessage']);
const successStatus = composeB(setErrorStatus(true), setLoadingStatus(false));
const loadingError = compose2(flow, successStatus, setErrorMessage) ;
const clearMessages = composeB(setLoadingMessage(''), setErrorMessage(''));

const reactions = {
    [appActionTypes.LOADING_START]: loadingStart,
    [appActionTypes.LOADING_ERROR]: loadingError,
    [appActionTypes.LOADING_SUCCESS]: loadingSuccess,
    [appActionTypes.CLEAR_MESSAGES]: clearMessages
};

export default reactions;