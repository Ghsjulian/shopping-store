import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { isAdmin, getInfo } from "../Cookies";
import { useCart } from "../context/useCart";
import { getCurrency } from "../auth/Auth";
import ProductLoader from "./ProductLoader";

const RelatedProduct = ({ category }) => {
    const { dispatch, addCart, isCart } = useCart();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `${apiUrl}/products/category-product/${category}`
                );
                if (response.data) {
                    setProducts(response.data);
                    setIsLoading(false);
                } else {
                    setIsProducts(false);
                    console.log("No Products Found");
                }
            } catch (error) {
                setIsProducts(true);
                console.log(error);
            }
        };
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, [category]);

    return (
        <section className="page">
            <h2 className="heading">Our Latest Products</h2>
            <div className="grid" id="products">
                {isLoading && <ProductLoader />}

                {!isLoading && products.length > 0 ? (
                    products.map((product, index) => {
                        return (
                            <div className="col" key={index + product._id}>
                                <img
                                    src={product.product_img}
                                    alt="Product Image"
                                />
                                {/*
                                <span className="price">
                                    Price :
                                    {getCurrency(
                                        "encode",
                                        products.product_desc.price
                                    )}
                                </span>
                                */}
                                <span className="name">
                                    {product.product_title}
                                </span>
                                <div className="btn-area">
                                    <NavLink
                                        to={`/view-product/${product._id}`}
                                    >
                                        <i
                                            className="bx 
 bxs-show"
                                        ></i>
                                        <span>View Product</span>
                                    </NavLink>

                                    {!isAdmin() && isCart(product._id) == 0 && (
                                        <NavLink
                                            onClick={() => {
                                                if (
                                                    getInfo().id &&
                                                    getInfo().token
                                                ) {
                                                    addCart(product, 1);
                                                } else {
                                                    navigate("/login");
                                                }
                                            }}
                                            to="#"
                                        >
                                            <i className="bx bxs-cart-add"></i>
                                            <span>Add Cart</span>
                                        </NavLink>
                                    )}
                                    {isCart(product._id).length > 0 && (
                                        <NavLink
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
                                            to={`/admin/edit-product/${product._id}`}
                                        >
                                            <i className="bx bx-pencil"></i>
                                            <span>Edit Product</span>
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col">
                        <img src={products.product_img} alt="Product Image" />
                        
                        {/*<span className="price">
                            Price :
                            {getCurrency("encode", products.product_desc.price)}
                        </span>
                        */}
                        <span className="name">{products.product_title}</span>
                        <div className="btn-area">
                            <NavLink to={`/view-product/${products._id}`}>
                                <i
                                    className="bx 
 bxs-show"
                                ></i>
                                <span>View Product</span>
                            </NavLink>

                            {!isAdmin() && isCart(products._id) == 0 && (
                                <NavLink
                                    onClick={() => {
                                        if (getInfo().id && getInfo().token) {
                                            addCart(products, 1);
                                        } else {
                                            navigate("/login");
                                        }
                                    }}
                                    to="#"
                                >
                                    <i className="bx bxs-cart-add"></i>
                                    <span>Add Cart</span>
                                </NavLink>
                            )}
                            {isCart(products._id).length > 0 && (
                                <NavLink
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
                                    to={`/admin/edit-product/${products._id}`}
                                >
                                    <i className="bx bx-pencil"></i>
                                    <span>Edit Product</span>
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}

                {/*
                {products.length > 0 &&
                    !isLoading &&
                    products.map((product, index) => {
                        return (
                            <div className="col" key={index + product._id}>
                                <img
                                    src={product.product_img}
                                    alt="Product Image"
                                />
                                <span className="price">
                                    Price :
                                    {getCurrency(
                                        "encode",
                                        product.product_desc.price
                                    )}
                                </span>
                                <span className="name">
                                    {product.product_title}
                                </span>
                                <div className="btn-area">
                                    <NavLink
                                        to={`/view-product/${product._id}`}
                                    >
                                        <i
                                            className="bx 
 bxs-show"
                                        ></i>
                                        <span>View Product</span>
                                    </NavLink>

                                    {!isAdmin() && isCart(product._id) == 0 && (
                                        <NavLink
                                            onClick={() => {
                                                if (
                                                    getInfo().id &&
                                                    getInfo().token
                                                ) {
                                                    addCart(product, 1);
                                                } else {
                                                    navigate("/login");
                                                }
                                            }}
                                            to="#"
                                        >
                                            <i className="bx bxs-cart-add"></i>
                                            <span>Add Cart</span>
                                        </NavLink>
                                    )}
                                    {isCart(product._id).length > 0 && (
                                        <NavLink
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
                                            to={`/admin/edit-product/${product._id}`}
                                        >
                                            <i className="bx bx-pencil"></i>
                                            <span>Edit Product</span>
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                {products.length == 0 && !isLoading && (
                    <div className="col">
                        <img src={products.product_img} alt="Product Image" />
                        <span className="price">
                            Price :
                        </span>
                        <span className="name">{products.product_title}</span>
                        <div className="btn-area">
                            <NavLink to={`/view-product/${products._id}`}>
                                <i
                                    className="bx 
 bxs-show"
                                ></i>
                                <span>View Product</span>
                            </NavLink>

                            {!isAdmin() && isCart(products._id) == 0 && (
                                <NavLink
                                    onClick={() => {
                                        if (getInfo().id && getInfo().token) {
                                            addCart(products, 1);
                                        } else {
                                            navigate("/login");
                                        }
                                    }}
                                    to="#"
                                >
                                    <i className="bx bxs-cart-add"></i>
                                    <span>Add Cart</span>
                                </NavLink>
                            )}
                            {isCart(products._id).length > 0 && (
                                <NavLink
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
                                    to={`/admin/edit-product/${products._id}`}
                                >
                                    <i className="bx bx-pencil"></i>
                                    <span>Edit Product</span>
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
                */}
            </div>
        </section>
    );
};

export default RelatedProduct;
