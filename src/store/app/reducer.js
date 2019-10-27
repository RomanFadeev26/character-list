import { createReducer } from 'utilities/createReducer';
import reactions from './reactions';

const initialState = {
    loading: {
        isLoading: false,
        loadingMessage: "",
        isError: false,
        errorMessage: ""
    },
    entities: {
        characters: {}
    }
};

export default createReducer(reactions, initialState);
