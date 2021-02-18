import {LOAD_CATEGORIES} from "../constants";

const categories = (state = [], { category,  type }) => {
    switch (type) {
        case LOAD_CATEGORIES :
            return [
                ...state, {
                    category,
                }
            ];
        default:
            return state;
    }
}

export default categories;