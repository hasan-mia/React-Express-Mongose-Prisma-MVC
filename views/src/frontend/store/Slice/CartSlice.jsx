/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: null,
        subtotal: 0,
        selectedAddress: null,
        selectedPaymentMethod: null,
    },
    reducers: {
        getCart: (state) => {
            const cartItem = JSON.parse(localStorage.getItem('carts'));
            if (cartItem) {
                state.carts = cartItem;
                state.subtotal = state.carts.reduce(
                    (sum, cart) => sum + cart.price * cart.quantity,
                    0
                );
            } else {
                state.carts = [];
            }
        },
        removeCart: (state) => {
            const cartItem = JSON.parse(localStorage.getItem('carts'));
            if (cartItem) {
                const remainingCart = cartItem.filter((item) =>
                    state.carts.every((element) => element.uuid !== item.uuid)
                );
                // const remainingSingleCart = cartItem.filter((item) =>
                //     state.carts.some((element) => element.uuid !== item.uuid)
                // );
                state.carts = remainingCart;
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                state.carts = [];
            }
        },
        addCart: (state, action) => {
            const { uuid, quantity, stock } = action.payload;
            if (state.carts) {
                const exists = state.carts.filter((cart) => cart.uuid === uuid);
                if (exists.length > 0) {
                    const totalQty = exists[0].quantity + quantity;
                    if (totalQty <= stock) {
                        exists[0].quantity += quantity;
                    }
                } else if (quantity <= stock) {
                    state.carts.push(action.payload);
                }
            } else if (quantity <= stock) {
                state.carts.push(action.payload);
            }
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },
        incrementCart: (state, action) => {
            const uuid = action.payload;
            const exists = state.carts.filter((cart) => cart.uuid === uuid);
            if (exists.length >= 1) {
                const totalQty = exists[0].quantity + 1;
                const { stock } = exists[0];
                if (totalQty <= stock) {
                    exists[0].quantity += 1;
                }
            }
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },
        decrementCart: (state, action) => {
            const uuid = action.payload;
            const exists = state.carts.filter((cart) => cart.uuid === uuid);
            if (exists.length >= 1) {
                const totalQty = exists[0].quantity - 1;
                if (totalQty > 0) {
                    exists[0].quantity -= 1;
                }
            }
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },
        buyNow: (state, action) => {
            state.carts = [action.payload];
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },
        selectAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        selectPaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload;
        },
    },
});
export const {
    getCart,
    removeCart,
    addCart,
    incrementCart,
    decrementCart,
    buyNow,
    selectAddress,
    selectPaymentMethod,
} = CartSlice.actions;
export default CartSlice.reducer;
