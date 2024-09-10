import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { isAdmin, getInfo } from "../Cookies";
import { useCart } from "../context/useCart";
import { getCurrency } from "../auth/Auth";
import RelatedProduct from "./RelatedProduct"


const ViewProduct = () => {
    const { id } = useParams();
    const { dispatch, addCart, isCart } = useCart();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [product, setProducts] = useState({});
    const [desc, setDesc] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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
            {product && (
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
                            <h3>Product Quantity : 5</h3>
                            <div className="button-area">
                                <h3>Set Product Quantity</h3>
                                <button id="quantity">-</button>
                                <button id="quantity">+</button>
                            </div>
                            <br />
                            <div className="button-area">
                                <button id="cart">
                                    <i className="bx bxs-cart-add"></i> Add Cart
                                </button>
                                <button id="call">
                                    <i className="bx bxs-phone"></i> Contact Now
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
                {product&&
               <RelatedProduct/>
            }
            
        </section>
    );
};

export default ViewProduct;
