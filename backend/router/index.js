const express = require("express");
const router = express.Router();
// Import All Controllers Here...
const userController = require("../controllers/userController");

/*------------------------------------------*/
// Creating Routes Here...
// Testing Route Here...
router.get("/users", userController.allUsers);
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
/*------------------------------------------*/
// Exported The Router Here...
module.exports = router;
