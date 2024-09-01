const express = require("express");
const router = express.Router();
// Import All Controllers Here...
const multerConfig = require("../auth/multerConfig");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

const uploadFolder = "./public/products/"; // Specify the folder where you want to store the uploaded files
const upload = multerConfig(uploadFolder); // Create a Multer instance with the specified uploadFolder
/*------------------------------------------*/
// Creating Routes Here...
// User Route Here...
router.get("/users", userController.allUsers);
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
/*------------------------------------------*/
// Product Routes Here...
router.get("/admin/all-products", productController.getAllProducts);
router.get("/admin/get-product/:id", productController.getProduct); //id = 66d484e8589347cefc10b955
router.post(
    "/admin/add-product",
    upload.single("file"),
    productController.addProduct
);
router.put(
    "/admin/update-product/:id",
    upload.single("file"),
    productController.updateProduct
); // id= 66d484e8589347cefc10b955
// Exported The Router Here...
module.exports = router;
