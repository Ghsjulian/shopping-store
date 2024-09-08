import React from "react";
import "../admin/styles/admin-layout.css";
import { useCart } from "../context/useCart";
import { getCurrency } from "../auth/Auth";

const Cart = () => {
    const { cart, inCreaseQuantity, decraseQuantity, removeCart } = useCart();
    return (
        <section data-aos="zoom-in" id="view" className="page">
            <div className="all-products">
                <h2 className="heading">Your Cart List </h2>
                {
                    cart.length == 0 && (
                     <h3>No Product In Cart</h3>
                     )
                }
                
                
                
                {cart.length > 0 &&
                    cart.map((item, index) => {
                        return (
                            <div className="product-list" key={index + item.id}>
                                <div
                                    id="cart-col"
                                    className="user-cart cart-col"
                                >
                                    <img src={item.img} alt={item.title} />
                                    <div className="price-col">
                                        <span>{item.title}</span>
                                        <span>
                                            Price :
                                            {getCurrency("encode", item.price)}
                                        </span>
                                        <span>Quantity : {item.quantity}</span>
                                        <div id="action-btn">
                                            <button
                                                id="btn"
                                                onClick={e => {
                                                    decraseQuantity(
                                                        item.id,
                                                        item.price,
                                                        item.quantity
                                                    );
                                                }}
                                            >
                                                -
                                            </button>
                                            <button
                                                id="btn"
                                                onClick={e => {
                                                    inCreaseQuantity(
                                                        item.id,
                                                        item.price,
                                                        item.quantity
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div id="action-btn">
                                            <button id="edit">
                                                <i className="bx bx-edit"></i>
                                                Edit
                                            </button>
                                            <button
                                                onClick={e => {
                                                    removeCart(item.id);
                                                }}
                                                id="remove"
                                            >
                                                <i className="bx bxs-trash"></i>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {/* <div className="product-list">
                    <div id="cart-col" className="user-cart cart-col">
                        <img src="/images/o2.jpg" alt="Product Image" />
                        <div className="price-col">
                            <span>Women Earrings Officials And New York</span>
                            <span>Price : 234TK BDT</span>
                            <span>Quantity : 5</span>
                            <div id="action-btn">
                                <button id="btn">-</button>
                                <button id="btn">+</button>
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
                */}
            </div>
        </section>
    );
};

export default Cart;
