import {
    useContext,
    createContext,
    useReducer,
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import { cartReducer } from "../reducer/CartReducer";
import { getInfo } from "../Cookies";

const host = import.meta.env.VITE_API_URL;
const CartContext = createContext();
const initialstate = {
    cart: JSON.parse(localStorage.getItem("cart")) ?? []
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialstate);
    const addCart = (product, quantity) => {
        const price = product.product_desc.price;
        const cartProduct = {
            id: product._id,
            title: product.product_title,
            fixed_price: product.fixed_price,
            current_price: product.product_desc.price,
            quantity,
            img: product.product_img
        };

        dispatch({
            type: "ADD_TO_CART",
            payload: { product: cartProduct }
        });
    };
    const isCart = id => {
        const cartList = localStorage.getItem("cart") || null;
        if (cartList !== null) {
            const data = JSON.parse(cartList);
            return data.filter(item => item.id === id);
        }
        return false;
    };
    const inCreaseQuantity = (id, fixed_price, current_price, quantity) => {
        if (quantity == 5) {
            return;
        } else {
            dispatch({
                type: "SET_QUANTITY",
                payload: {
                    id,
                    quantity: quantity + 1,
                    current_price
                }
            });
        }
    };
    const decraseQuantity = (id, price, quantity) => {
        if (quantity == 1) {
            return;
        } else {
            dispatch({
                type: "DECREASE_QUANTITY",
                payload: {
                    id,
                    quantity: quantity - 1,
                    price
                }
            });
        }
    };
    const removeCart = id => {
        dispatch({
            type: "REMOVE_CART",
            payload: { id }
        });
    };
    return (
        <CartContext.Provider
            value={{
                ...state,
                dispatch,
                addCart,
                isCart,
                inCreaseQuantity,
                decraseQuantity,
                removeCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return useContext(CartContext);
};

export { CartProvider, useCart, CartContext };
