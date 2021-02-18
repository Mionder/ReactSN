import {SAVE_USER} from "../constants";


const users = (state = [], { id, login, password, email, type }) => {
    switch (type) {
        case SAVE_USER :
            return [
                ...state, {
                    id,
                    login,
                    password,
                    email,
                }
            ];
        default:
            return state;
    }
}
export default users;