import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {

            state.status = 'authenticated'
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            
        },
        logout: (state, action) => {

            state.status = 'not-authenticated'
            state.uid = null
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage

        },
        checkingCredential: (state, /* action */ ) => {
            state.status = 'checking';
        },

    }
});


// Action creators are generated for each case reducer function
export const { login,logout,checkingCredential } = authSlice.actions;