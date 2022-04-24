const INITIAL_STATE = [];

export default (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case "ADD_FAV":
            return [...state,action.payload]
            break;
        default:
            return state;
            break;
    }
}