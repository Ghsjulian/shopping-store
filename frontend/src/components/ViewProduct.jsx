import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { isAdmin, getInfo } from "../Cookies";
import { useCart } from "../context/useCart";
import { getCurrency } from "../auth/Auth";
import RelatedProduct from "./RelatedProduct";

const ViewProduct = () => {
    const { id } = useParams();
    const { dispatch, addCart, isCart } = useCart();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [product, setProducts] = useState({});
    const [desc, setDesc] = useState({});
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currentPrice, setcurrentPrice] = useState(0);
    const handleQuantity = type => {
        if (type === "increase") {
            setQuantity(quantity + 1);
            let price = product.product_desc.price;
            product.product_desc.price =
                parseInt(currentPrice) + parseInt(price);
        } else {
            setQuantity(quantity - 1);
            let price = product.product_desc.price;
            product.product_desc.price =
                parseInt(price) - parseInt(currentPrice);
        }
        product.main_price = currentPrice;
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${apiUrl}/products/get-product/${id}`
                );
                if (response.data) {
                    // alert(JSON.stringify(response.data));
                    // alert(response.data.product_desc.price);
                    document.title =
                        "View Product - " + response.data.product_title;
                    setProducts(response.data);
                    setDesc(response.data.product_desc);
                    setcurrentPrice(response.data.product_desc.price);
                    setCategory(response.data.product_category);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    console.log("No Products Found");
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, [id]);
    return (
        <section data-aos="zoom-in" id="view" className="page">
            {product !== 0 && (
                <>
                    <div className="view-product">
                        <img
                            src={product.product_img}
                            id="product-img"
                            alt={product.product_title}
                        />
                        <div clclassName="product-col">
                            <h3>Product Name : {product.product_title}</h3>
                            <h3>
                                Product Price :
                                {getCurrency("encode", desc.price)}
                            </h3>
                            <h3>Product Color : {desc.color}</h3>
                            <h3>Product Size : {desc.size}</h3>
                            <p className="desc">
                                {desc.desc} . This is a demo product Description
                                added for testing purposes inly. it is
                                displaying here as the product description and i
                                will add here dynamic content from the API. But
                                right now it is only demo content.
                            </p>
                            <h3>Product Quantity : {quantity}</h3>
                            <div className="button-area">
                                <h3>Set Product Quantity</h3>
                                <button
                                    onClick={e => {
                                        if (quantity == 1) {
                                            return;
                                        } else {
                                            handleQuantity("decrease");
                                        }
                                    }}
                                    id="quantity"
                                >
                                    -
                                </button>
                                <button
                                    onClick={e => {
                                        if (quantity == 5) {
                                            return;
                                        } else {
                                            handleQuantity("increase");
                                        }
                                    }}
                                    id="quantity"
                                >
                                    +
                                </button>
                            </div>
                            <br />
                            <div className="button-area">
                                {!isAdmin() && isCart(product._id) == 0 && (
                                    <button
                                        id="cart"
                                        onClick={() => {
                                            if (
                                                getInfo().id &&
                                                getInfo().token
                                            ) {
                                                addCart(product, quantity);
                                            } else {
                                                navigate("/login");
                                            }
                                        }}
                                        to="#"
                                    >
                                        <i className="bx bxs-cart-add"></i>
                                        <span>Add Cart</span>
                                    </button>
                                )}
                                {isCart(product._id).length > 0 && (
                                    <NavLink
                                        id="cart"
                                        style={{
                                            padding: ".1rem .5rem"
                                        }}
                                        to="/cart"
                                    >
                                        <i className="ri ri-checkbox-circle-line"></i>
                                        <span>Added</span>
                                    </NavLink>
                                )}

                                {isAdmin() && (
                                    <NavLink
                                        id="cart"
                                        to={`/admin/edit-product/${product._id}`}
                                    >
                                        <i className="bx bx-pencil"></i>
                                        <span>Edit Product</span>
                                    </NavLink>
                                )}
                                {/*
                                <button id="cart">
                                    <i className="bx bxs-cart-add"></i> Add Cart
                                </button>
                                */}
                                <button id="call">
                                    <i className="bx bxs-phone"></i> Contact Now
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {product !== 0 && !isLoading && (
                <RelatedProduct category={category} />
            )}
        </section>
    );
};

export default ViewProduct;
