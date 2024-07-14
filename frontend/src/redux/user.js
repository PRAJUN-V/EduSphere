import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    id: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: null  // Initialize profile_picture as null or empty string
};

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.profile_picture = action.payload.profile_picture; // Update profilePicture
        },
        clearUser: (state) => {
            state.id = '';
            state.username = '';
            state.email = '';
            state.first_name = '';
            state.last_name = '';
            state.profile_picture = '';  // Clear profilePicture on logout
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
