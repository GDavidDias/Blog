import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    username:"",
    name:"",
    id:"",
    token:"",
    posts:[],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            let {username,name,id,token} = action.payload;
            state.username=username;
            state.name=name;
            state.id=id;
            state.token=token
        },
        outUser:(state,action)=>{
            state.username='';
            state.name='';
            state.id='';
            state.token='';
        },
        setPosts:(state,action)=>{
            state.posts=action.payload;
        }
    },
});

export const {setUser,outUser,setPosts} = userSlice.actions;
export default userSlice.reducer;