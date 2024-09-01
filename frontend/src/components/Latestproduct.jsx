import React from "react";
import { NavLink } from "react-router-dom";

const Latestproduct = () => {
    return (
        <section className="page">
            <h2 className="heading">Our Latest Products</h2>
            <div className="grid" id="products">
                <div className="col" >
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
            </div>
        </section>
    );
};

export default Latestproduct;
