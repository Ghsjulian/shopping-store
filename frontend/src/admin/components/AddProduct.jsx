import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/admin-layout.css";

const AddProduct = () => {
    document.title = "Add New Product - Shopping Cart";
    const host = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const btnRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileData, setFileDataURL] = useState(null);
    const [products, setProduct] = useState({
        product_title: "",
        product_desc: "",
        product_obj: null,
        product_category: ""
    });
    const createObject = string => {
        const strings = string.split(",");
        const obj = {};
        for (let i = 0; i < strings.length; i++) {
            let [key, value] = strings[i].split(":");
            key = key.trim();
            value = value.trim();
            obj[key] = value;
        }
        return obj;
    };
    const handleChange = event => {
        setProduct({ ...products, [event.target.name]: event.target.value });
    };
    const handleFileChange = event => {
        const imgfile = event.target.files[0];
        setFile(imgfile);
    };

    const UploadProduct = async () => {
        console.log(products);
        console.log(file);
        if (
            file !== null &&
            products.product_title &&
            products.product_category &&
            products.product_desc
        ) {
            const obj = createObject(products.product_desc);
            products.product_obj = obj;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", JSON.stringify(products));
            try {
                btnRef.current.textContent = "Processing...";
                const sendData = await fetch(
                    host + "/admin/products/add-product",
                    {
                        method: "POST",
                        //  headers: { "Content-Type": "multipart/form-data" },
                        body: formData // JSON.stringify(data)
                    }
                );
                const response = await sendData.json();
                btnRef.current.textContent = "Add Product";
                if (response.type) {
                    messageRef.current.classList.add("success");
                    messageRef.current.textContent = response.success;
                    navigate("/admin/all-products");
                } else {
                    messageRef.current.classList.add("error");
                    messageRef.current.textContent = response.error;
                }
            } catch (error) {
                messageRef.current.classList.add("error");
                messageRef.current.textContent = error;
            }
        } else {
            messageRef.current.classList.add("error");
            messageRef.current.textContent = "All Fields Are Required";
        }
        setTimeout(() => {
            messageRef.current.classList.remove("error");
            messageRef.current.textContent = "";
        }, 3000);
    };
    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = e => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);

    return (
        <section className="page">
            <div id="add-product" className="signup-form">
                <h2 className="heading">Add New Product</h2>
                {fileData && <img src={fileData} alt="File For Uploading" />}
                <span ref={messageRef} id="message"></span>
                <label htmlFor="product_img">
                    <i className="bx bx-image-add"></i>
                    Upload Product Image
                </label>
                <input
                    type="file"
                    id="product_img"
                    hidden={true}
                    accept="*/*"
                    multiple
                    onChange={handleFileChange}
                />
                <input
                    name="product_title"
                    type="text"
                    placeholder="Enter Product Title"
                    onChange={handleChange}
                    value={products.product_title}
                />
                <input
                    name="product_category"
                    type="text"
                    placeholder="Enter Product Category"
                    onChange={handleChange}
                    value={products.product_category}
                />
                <textarea
                    name="product_desc"
                    placeholder="Enter Products Descriptions"
                    onChange={handleChange}
                    resizeable={false}
                    value={products.product_desc}
                ></textarea>
                <button ref={btnRef} onClick={UploadProduct} className="submit">
                    Add Product
                </button>
            </div>
        </section>
    );
};

export default AddProduct;
