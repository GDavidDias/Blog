import {createSlice} from '@reduxjs/toolkit';

const initialState={
    posts:[]
}

export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setAllPosts:(state,action)=>{
            state.posts = action.payload;
        },
    }
});

export const {setAllPosts}=postSlice.actions;
export default postSlice.reducer;