import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get(
			`https://63343f9f433198e79dd3b5ea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
		);
		return data;
	},
);

const initialState = {
	items: [],
	status: '', //loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,

	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.items = [];
			state.status = 'loading';
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state) => {
			state.items = [];
			state.status = 'error';
		},
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
