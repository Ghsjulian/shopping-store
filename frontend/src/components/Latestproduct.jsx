import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { getCurrency } from "../auth/Auth";

const Latestproduct = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(apiUrl + "/products/all-products");
            if (response.data) {
                setProducts(response.data);
                setIsLoading(false);
            } else {
                setIsProducts(false);
                console.log("No Products Found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, [isLoading]);

    return (
        <section className="page">
            <h2 className="heading">Our Latest Products</h2>
            <div className="grid" id="products">
                {products.length > 0 &&
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
                                    <NavLink to="#">
                                        <i
                                            className="bx 
 bxs-cart-add"
                                        ></i>
                                        <span> Add Cart</span>
                                    </NavLink>
                                </div>
                            </div>
                        );
                    })}

                {/*
                <div className="col">
                    <img src="/images/b1.jpg" alt="Product Image" />
                    <span className="price">Price : 578TK BDT</span>
                    <span className="name">Awesome Women Cloths</span>
                    <div className="btn-area">
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-show"
                            ></i>
                            <span>View Product</span>
                        </NavLink>
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-cart-add"
                            ></i>
                            <span> Add Cart</span>
                        </NavLink>
                    </div>
                </div>
                <div className="col">
                    <img src="/images/b2.jpg" alt="Product Image" />
                    <span className="price">Price : 578TK BDT</span>
                    <span className="name">Awesome Women Cloths</span>
                    <div className="btn-area">
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-show"
                            ></i>
                            <span>View Product</span>
                        </NavLink>
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-cart-add"
                            ></i>
                            <span> Add Cart</span>
                        </NavLink>
                    </div>
                </div>
                <div className="col">
                    <img src="/images/o3.jpg" alt="Product Image" />
                    <span className="price">Price : 578TK BDT</span>
                    <span className="name">Awesome Women Cloths</span>
                    <div className="btn-area">
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-show"
                            ></i>
                            <span>View Product</span>
                        </NavLink>
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-cart-add"
                            ></i>
                            <span> Add Cart</span>
                        </NavLink>
                    </div>
                </div>
                <div className="col">
                    <img src="/images/o1.jpg" alt="Product Image" />
                    <span className="price">Price : 578TK BDT</span>
                    <span className="name">Awesome Women Cloths</span>
                    <div className="btn-area">
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-show"
                            ></i>
                            <span>View Product</span>
                        </NavLink>
                        <NavLink to="#">
                            <i
                                className="bx 
 bxs-cart-add"
                            ></i>
                            <span> Add Cart</span>
                        </NavLink>
                    </div>
                </div>
                */}
            </div>
        </section>
    );
};

export default Latestproduct;
