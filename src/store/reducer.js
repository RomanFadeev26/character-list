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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
