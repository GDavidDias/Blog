import {createSlice} from '@reduxjs/toolkit';

const initialState={
    posts:[],
    postDetail:{},
    filterPosts:[],
    categories:[],
}

export const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{
        setAllPosts:(state,action)=>{
            state.posts = action.payload;
            state.filterPosts= action.payload;
        },
        deleteAllPosts:(state,action)=>{
            state.posts = [];
            state.filterPosts= [];
        },
        setPostDetail:(state,action)=>{
            state.postDetail=action.payload;
        },
        setFilterPosts:(state,action)=>{            
            state.filterPosts = action.payload;
        },
        setCategories:(state,action)=>{
            state.categories = action.payload;
        }
    }
});

export const {setAllPosts,setPostDetail,setFilterPosts,setCategories,deleteAllPosts}=postSlice.actions;
export default postSlice.reducer;