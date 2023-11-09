import {createSlice} from '@reduxjs/toolkit';

const initialState={
    posts:[],
    postDetail:{},
    filterPosts:[],
    categories:[],
    editPost:'',
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
        deletePostDetail:(state,action)=>{
            state.postDetail={};
        },
        setFilterPosts:(state,action)=>{            
            state.filterPosts = action.payload;
        },
        setCategories:(state,action)=>{
            state.categories = action.payload;
        },
        setEditPost:(state,action)=>{
            state.editPost = action.payload;
        },
    }
});

export const {setAllPosts,setPostDetail,setFilterPosts,setCategories,deleteAllPosts,deletePostDetail,setEditPost}=postSlice.actions;
export default postSlice.reducer;