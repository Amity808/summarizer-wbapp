import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { articleApi } from "./article";


export const store = configureStore({
    // is use to grab only what we need to use
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer
    },
    // this allow to use the state before we get
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})