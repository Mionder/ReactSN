import {LOAD_POSTS} from "../constants";

const posts = (state = [], { name, date, info, id, status, category, clicks, ownerId, type }) => {
    switch (type) {
        case LOAD_POSTS :
            return [
                ...state, {
                    name,
                    date,
                    info,
                    id,
                    status,
                    category,
                    clicks,
                    ownerId
                }
            ];
        default:
            return state;
    }
}

export default posts;