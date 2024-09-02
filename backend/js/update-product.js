const fetImage = async () => {
    try {
        const img = document.querySelector("img").src;
        const response = await fetch(img);
        const blob = await response.blob();
        return blob;
        //console.log(blob);
        //formdata.append(blob)
    } catch (error) {
        console.log(error);
    }
};

const updatProduct = async () => {
    const url =
        "http://localhost:5000/api/admin/update-product/66d484e8589347cefc10b955";
    const data = {
        isImg: "YES",
        product_title: "Product Title",
        product_desc: {
            width: "120X120",
            height: "70X70",
            price: "370",
            color: "red",
            desc: "This is a trensing product"
        },
        product_category: "Product Category"
    };
    try {
        var formdata = new FormData();
        formdata.append("file", await fetImage());
        formdata.append("data", JSON.stringify(data));
        const sendData = await fetch(url, {
            method: "PUT",
            //  headers: { "Content-Type": "multipart/form-data" },
            body: formdata // JSON.stringify(data)
        });
        const response = await sendData.json();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};
updatProduct();
