import {SAVE_USER, LOAD_POSTS, LOAD_PRODUCTS, LOAD_CATEGORIES} from "../constants";

export const saveUsers = (id, login, password, email) => ({
    type: SAVE_USER,
    id,
    login,
    password,
    email
});

export const loadPosts = (name, date, info, id, status, category, clicks, ownerId) => ({
    type: LOAD_POSTS,
    name,
    date,
    info,
    id,
    status,
    category,
    clicks,
    ownerId,
});

export const loadProducts = (title, price, currency, description, status, ownerId, clicks, img, orders, id) => ({
    type: LOAD_PRODUCTS,
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
});

export const loadCategories = (category) => ({
    type: LOAD_CATEGORIES,
    category
})