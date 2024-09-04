import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { getCurrency } from "../../auth/Auth";

const AllProducts = () => {
    document.title = "All Products List - Shopping Cart";
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
    const editProduct = id => {
        navigate(`/admin/edit-product/${id}`);
    };
    const deleteProductById = async id => {
        try {
            const response = await axios.delete(
                `${apiUrl}/admin/products/delete-product/${id}`
            );
            if (response.data.type) {
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteProduct = id => {
        deleteProductById(id);
        fetchProduct();
    };

    return (
        <section data-aos="zoom-in" id="view" className="page">
            <div className="all-products">
                {products.length > 0 ? (
                    <h2 className="heading">
                        Admin All Product List({products.length})
                    </h2>
                ) : (
                    <h2 className="heading">
                        No Product Added Yet({products.length})
                    </h2>
                )}
                {products.length > 0 &&
                    products.map((product, index) => {
                        return (
                            <>
                                <div className="product-list" key={product._id+ 2}>
                                    <div id="cart-col" className="cart-col">
                                        <img
                                            src={product.product_img}
                                            alt="Product Image"
                                        />
                                        <div className="price-col">
                                            <span>{product.product_title}</span>
                                            <span>
                                                Category :
                                                {product.product_category}
                                            </span>
                                            <span>
                                                Price :
                                                {getCurrency(
                                                    "encode",
                                                    product.product_desc.price
                                                )}
                                            </span>
                                            <div id="action-btn">
                                                <button
                                                    onClick={() => {
                                                        editProduct(
                                                            product._id
                                                        );
                                                    }}
                                                    id="edit"
                                                >
                                                    <i className="bx bx-edit"></i>
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteProduct(
                                                            product._id
                                                        );
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
                            </>
                        );
                    })}
                {/*
                <div className="product-list">
                    <div id="cart-col" className="cart-col">
                        <img src="/images/o2.jpg" alt="Product Image" />
                        <div className="price-col">
                            <span>Women Earrings Officials</span>
                            <span>Category : T-Shirt</span>
                            <span>Price : 234TK BDT</span>
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

export default AllProducts;
