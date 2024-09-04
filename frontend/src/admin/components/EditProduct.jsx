import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "../styles/admin-layout.css";

const EditProduct = () => {
    document.title = "Add New Product - Shopping Cart";
    const param = useParams();
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const btnRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileData, setFileDataURL] = useState(null);
    const [desc, setDesc] = useState("");
    const initialProduct = {
        product_title: "",
        product_desc: "",
        product_obj: null,
        product_category: ""
    };
    const [products, setProduct] = useState(initialProduct);
    const createStr = data => {
        let str = data
            .trim()
            .replaceAll('"', "")
            .replace("{", "")
            .replace("}", "");
        return str;
    };
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
    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${apiUrl}/products/get-product/${param.id}`
            );
            if (response.data) {
                setProduct(response.data);
                setDesc(createStr(JSON.stringify(response.data.product_desc)));
                setFileDataURL(response.data.product_img);
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
    }, [param.id]);

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


const UpdateProduct = async ()=>{
   if(products.product_title && products.product_category && desc) {
       alert(JSON.stringify(products))
   }
}




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
                    onChange={e => {
                        setDesc(e.target.value);
                    }}
                    value={desc}
                ></textarea>
                <button ref={btnRef} 
                onClick={UpdateProduct}
                className="submit">
                    Update Product
                </button>
            </div>
        </section>
    );
};

export default EditProduct;
