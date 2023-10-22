import {createSlice} from '@reduxjs/toolkit';

const initialState={
    posts:[],
    postDetail:{}
}

export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setAllPosts:(state,action)=>{
            state.posts = action.payload;
        },
        setPostDetail:(state,action)=>{
            state.postDetail=action.payload;
        },
    }
});

export const {setAllPosts,setPostDetail}=postSlice.actions;
export default postSlice.reducer;