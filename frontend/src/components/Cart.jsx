import React from "react";
import "../admin/styles/admin-layout.css";

const Cart = () => {
    return (
        <section data-aos="zoom-in" id="view" className="page">
            <div className="all-products">
                <h2 className="heading">Your Cart List</h2>
                <div className="product-list">
                    <div id="cart-col" className="user-cart cart-col">
                        <img src="/images/o2.jpg" alt="Product Image" />
                        <div className="price-col">
                            <span>Women Earrings Officials And New York</span>
                            <span>Price : 234TK BDT</span>
                            <span>Quantity : 5</span>
                            <div id="action-btn">
                                <button id="btn">
                                   -
                                </button>
                                <button id="btn">
                                   +
                                </button>
                            </div>
                            <div id="action-btn">
                                <button id="edit">
                                    <i className="bx bx-edit"></i>Edit
                                </button>
                                <button id="remove">
                                    <i className="bx bxs-trash"></i>Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
