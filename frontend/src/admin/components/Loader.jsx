import React from "react";
import { NavLink } from "react-router-dom";

const loadArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const Loader = () => {
    return loadArray.map((element, index) => {
        return (
            <div className="product-list">
                <div id="cart-col" className="cart-col cart-loader">
                    <div className="img-loader"></div>
                    <div className="price-col">
                        <span></span>
                        <span></span>
                        <span></span>
                        <div id="action-btn">
                            <div className="button"></div>
                            <div className="button"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};

export { Loader };
