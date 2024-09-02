const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || "shopping";
const DEV = process.env.DEV;
const URI = process.env.URI;

/* Use Middlewares Here */
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

/*------------------------------------------*/
// Imported The Router Here
// Defined The API Endpoints Path
const router = require("./router");
app.use("/api", router);
/*-----------------------------------*/
/* Start The Development Server */
mongoose
    .connect(URI, { dbName: DB })
    .then(() => {
        app.listen(PORT, () => {
            console.clear();
            console.log(
                "\n ----------------------------------------------------"
            );
            console.log(`\n [+] Server Is Running At -- ${PORT}\n`);
            console.log(` [+] Host  -- http://127.0.0.1:${PORT}\n`);
            console.log(` [+] MongoDB Databse Name  -- ${DB}\n`);
            console.log(` [+] MERN Stack Developer Name  -- ${DEV}\n`);
            console.log(` [+] MongoDB -- Database Connected Successfully !\n`);
            console.log(
                " ----------------------------------------------------"
            );
        });
    })
    .catch(error => {
        console.clear();
        console.log(error);
    });
module.exports = app