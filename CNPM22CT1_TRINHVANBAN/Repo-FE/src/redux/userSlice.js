import {createSlice} from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'users',
    initialState: {
        userList: {
            currentUsers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        listUserStart: (state) => {
            state.userList.isFetching = true
        },
        listUserSuccess: (state, action) => {
            state.userList.isFetching = false
            state.userList.currentUsers = action.payload
            state.userList.error = false
        },
        listUserError: (state) => {
            state.userList.isFetching = true
        }

    }
})
export const {
    listUserStart,
    listUserSuccess,
    listUserError
} = userSlice.actions;
export default userSlice.reducer;