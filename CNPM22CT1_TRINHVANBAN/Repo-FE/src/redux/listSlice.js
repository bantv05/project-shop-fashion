import { createSlice } from '@reduxjs/toolkit';

const createListSlice = (name) => {
    return {
        [`${name}Start`]: (state) => {
            state[name].isFetching = true;
        },
        [`${name}Success`]: (state, action) => {
            state[name].isFetching = false;
            state[name].currentList = action.payload;
            state[name].error = false;
        },
        [`${name}Error`]: (state) => {
            state[name].isFetching = false;
            state[name].error = true;
        }
    };
};

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: {
            currentList: null,
            isFetching: false,
            error: false,
        },
        listCate: {
            currentList: null,
            isFetching: false,
            error: false,
        },
        listSize: {
            currentList: null,
            isFetching: false,
            error: false,
        },
        listStyle: {
            currentList: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        ...createListSlice('list'),
        ...createListSlice('listCate'),
        ...createListSlice('listSize'),
        ...createListSlice('listStyle'),
    },
});

export const {
    listStart,
    listSuccess,
    listError,
    listCateStart,
    listCateSuccess,
    listCateError,
    listSizeStart,
    listSizeSuccess,
    listSizeError,
    listStyleStart,
    listStyleSuccess,
    listStyleError,
} = listSlice.actions;

export default listSlice.reducer;
