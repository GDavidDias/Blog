import {configureStore} from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import postReducer from './postSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer:{
        page: pageReducer,
        posts: postReducer,
        user: userReducer,
    }
});

export default store;