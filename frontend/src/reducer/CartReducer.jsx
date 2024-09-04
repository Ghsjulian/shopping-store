const cartReducer = (state,action)=>{
    switch (action.type) {
        case "INIT":
            const { init } = action.payload;
            return { ...state, cart: [...state.cart, init] };
        case "ADD_TO_CART":
            const { product } = action.payload;
            localStorage.setItem(
                "cartList",
                JSON.stringify([...state.cart, product])
            );
            return { ...state, cart: [...state.cart, product] };
         default:
            throw new Error();
    }
}

export { cartReducer };