const cartReducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            const { init } = action.payload;
            return { ...state, cart: [...state.cart, init] };
        case "ADD_TO_CART":
            const { product } = action.payload;
            localStorage.setItem(
                "cart",
                JSON.stringify([...state.cart, product])
            );
            return { ...state, cart: [...state.cart, product] };
        case "SET_QUANTITY":
            const { id, price, quantity } = action.payload;
            state.cart.filter(item => {
                if (item.id === id) {
                    item.quantity = quantity;
                    item.price = item.current_price + price;
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            });
            return { ...state, cart: [...state.cart] };
        case "DECREASE_QUANTITY":
            state.cart.filter(item => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.price = item.current_price - action.payload.price;
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            });
            return { ...state, cart: [...state.cart] };

        default:
            throw new Error();
    }
};

export { cartReducer };
