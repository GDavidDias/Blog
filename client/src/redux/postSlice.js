import {createSlice} from '@reduxjs/toolkit';

const initialState={
    posts:[],
    postDetail:{},
    filterPosts:[]
}

export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setAllPosts:(state,action)=>{
            state.posts = action.payload;
            state.filterPosts= action.payload;
        },
        setPostDetail:(state,action)=>{
            state.postDetail=action.payload;
        },
        setFilterPosts:(state,action)=>{            
            state.filterPosts = action.payload;
        }
    }
});

export const {setAllPosts,setPostDetail,setFilterPosts}=postSlice.actions;
export default postSlice.reducer;