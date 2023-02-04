/* eslint-disable no-underscore-dangle */
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
        // get total cart number
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

        // remove cart item after buy
        removeCart: (state) => {
            const cartItem = JSON.parse(localStorage.getItem('carts'));
            if (cartItem) {
                const remainingCart = cartItem.filter((item) =>
                    state.carts.every((element) => element._id !== item._id)
                );
                // const remainingSingleCart = cartItem.filter((item) =>
                //     state.carts.some((element) => element._id  !== item._id)
                // );
                state.carts = remainingCart;
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                state.carts = [];
            }
        },

        // add to cart
        addCart: (state, action) => {
            const { id, quantity, stock } = action.payload;
            if (state.carts) {
                const exists = state.carts.filter((cart) => cart._id === id);
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

        // direct buy now
        buyNow: (state, action) => {
            state.carts = [action.payload];
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },

        // increment cart item
        incrementCart: (state, action) => {
            const id = action.payload;
            const exists = state.carts.filter((cart) => cart._id === id);
            if (exists.length >= 1) {
                const totalQty = exists[0].quantity + 1;
                const { stock } = exists[0];
                if (totalQty <= stock) {
                    exists[0].quantity += 1;
                }
            }
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },

        // decrement cart item
        decrementCart: (state, action) => {
            const id = action.payload;
            const exists = state.carts.filter((cart) => cart._id === id);
            if (exists.length >= 1) {
                const totalQty = exists[0].quantity - 1;
                if (totalQty > 0) {
                    exists[0].quantity -= 1;
                }
            }
            state.subtotal = state.carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
        },

        // select address
        selectAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },

        // select payment
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
