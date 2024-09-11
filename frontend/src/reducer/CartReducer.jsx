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
            const { id, current_price, quantity } = action.payload;
            state.cart.filter(item => {
                if (item.id === id) {
                    item.quantity = quantity;
                    item.current_price =
                        parseInt(current_price) + parseInt(item.fixed_price);
                    localStorage.setItem("cart", JSON.stringify(state.cart));
                }
            });
            return { ...state, cart: [...state.cart] };
        case "DECREASE_QUANTITY":
            state.cart.filter(item => {
                if (item.id === action.payload.id) {
                    if (action.payload.quantity == 1) {
                        item.quantity = action.payload.quantity;
                        item.current_price =item.fixed_price;
                        localStorage.setItem(
                            "cart",
                            JSON.stringify(state.cart)
                        );
                    } else {
                        item.quantity = action.payload.quantity;
                        item.current_price =
                            parseInt(item.current_price) -
                            parseInt(item.fixed_price);
                        localStorage.setItem(
                            "cart",
                            JSON.stringify(state.cart)
                        );
                    }
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
