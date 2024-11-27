import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateInStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        updateInFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteInStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteInSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        },
        deleteInFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signoutInSuccess:(state,action)=>{
            state.loading = false;
            state.error = null;
            state.currentUser = null;
        }
    }
})
export const { signInStart, signInSuccess, signInFailed, updateInStart, updateInSuccess, updateInFailed,deleteInStart,deleteInSuccess,deleteInFailed ,signoutInSuccess} = userSlice.actions;
export default userSlice.reducer;