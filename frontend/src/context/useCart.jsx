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
    const addCart = () => {
        alert("Add Cart");
    };
    return (
        <CartContext.Provider value={{ ...state, dispatch, addCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    return useContext(CartContext);
};

export { CartProvider, useCart, CartContext };
