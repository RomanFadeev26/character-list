import composeB from 'crocks/combinators/composeB';
import branch from 'crocks/Pair/branch';
import bimap from 'crocks/pointfree/bimap';
import fst from 'crocks/Pair/fst';
import snd from 'crocks/Pair/snd';
import getPropOr from 'crocks/helpers/getPropOr';
import fetchAllCharacters from "../../../../api/fetchAllCharacters";
import {FETCH_CHARACTERS} from './actionTypes';
import {loadingError, loadingSuccess} from "../../../../store/app/actions/actions";

const fetchCharacters = (characters) => ({type: FETCH_CHARACTERS, payload: characters});

const dispatchFetchCharacters = dispatch => composeB(dispatch, fetchCharacters);
const dispatchLoadingSuccess = dispatch => composeB(dispatch, loadingSuccess);
const patchActions = composeB(bimap(dispatchFetchCharacters, dispatchLoadingSuccess), branch);
const fstAction = composeB(fst, patchActions);
const sndAction = composeB(snd, patchActions);

export const fetchAllCharactersAction = () => dispatch => fetchAllCharacters.fork(
    composeB(dispatch, composeB(loadingError, getPropOr('Unknown error', 'message'))),
    composeB(bimap(fstAction(dispatch), sndAction(dispatch)), branch)
);
