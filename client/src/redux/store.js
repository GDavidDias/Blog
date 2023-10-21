import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import postReducer from './postSlice';

const store = configureStore({
    reducer:{
        page: pageReducer,
        posts: postReducer,
    }
});

export default store;