import {combineReducers} from "redux";
import users from "./users";
import posts from "./posts";
import products from "./products";
import categories from "./categories";
const rootReducer = combineReducers({users, posts, products, categories});

export default rootReducer;