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
                    item.price =
                        parseInt(item.current_price) + parseInt(price);
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            });
            return { ...state, cart: [...state.cart] };
        case "DECREASE_QUANTITY":
            state.cart.filter(item => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                    item.price =
                        parseInt(action.payload.price) -
                        parseInt(item.current_price);
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            });
            return { ...state, cart: [...state.cart] };
        case "REMOVE_CART":
            const filter = state.cart.filter(
                item => item.id !== action.payload.id
            );
            localStorage.setItem("cart", JSON.stringify(filter));
            return {
                ...state,
                cart: filter
            };
        default:
            throw new Error();
    }
};

export { cartReducer };
