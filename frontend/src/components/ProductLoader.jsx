import React from "react";
import {NavLink} from "react-router-dom"
const ProductLoader = () => {
    const loadArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0];
    return (
        <>
            {loadArray.map((element, index) => {
                return (
                    <div className="col load-product" key={index+5}>
                        <div className="img-load"></div>
                        <span className="price"></span>
                        <span className="name"></span>
                        <div className="btn-area">
                            <NavLink to="#"></NavLink>
                            <NavLink to="#"></NavLink>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductLoader;
