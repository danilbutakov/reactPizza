import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		addItem(state, action) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload.id,
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			state.items = state.items.filter((obj) => obj.count !== 0);
			if (findItem) {
				findItem.count--;
			}
		},
		clearItems(state) {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
