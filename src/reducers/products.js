import {LOAD_PRODUCTS, SAVE_USER} from "../constants";

const products = (state = [], { title, price, currency, description, status, ownerId, clicks, img, orders, id,  type }) => {
    switch (type) {
        case LOAD_PRODUCTS :
            return [
                ...state, {
                    title,
                    price,
                    currency,
                    description,
                    status,
                    ownerId,
                    clicks,
                    img,
                    orders,
                    id,
                }
            ];
        default:
            return state;
    }
}

export default products;