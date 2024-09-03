const User = require("../models/user");
const dotenv = require("dotenv").config("../.env");
const auth = require("../auth");
const host = process.env.HOST;
const domain = process.env.DOMAIN;

/*------------------------------------------*/
// Creating User Class For Maintaing Users
class userController {
    async userSignup(req, res) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (username.length < 3) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Username Must Be At Least 3 Characters"
            });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Invalid Email Address"
            });
        }
        if (password.length < 5) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Password Must Be At Least 8 Characters"
            });
        }
        try {
            const isExist = await User.findOne({
                user_email: email
            });
            if (isExist) {
                throw new Error("User Already Registered !");
            } else {
                const encPassword = await auth.makeHash(password);
                var date = new Date();
                const today = date.toDateString();
                const token = await auth.encodeJWT({
                    username,
                    email,
                    today
                });
                const newUser = new User({
                    user_name: username,
                    user_email: email,
                    user_password: encPassword,
                    user_avtar: host + `/images/default_user.png`,
                    user_token: token,
                    user_type: "User"
                });
                const save = await newUser.save();
                if (save) {
                    const currentUser = await User.findOne({
                        user_email: email
                    });
                    return res.status(201).json({
                        code: 201,
                        userID: currentUser._id,
                        token,
                        user_type: "User",
                        date: today,
                        type: true,
                        status: "success",
                        success: "User Registration Successfully"
                    });
                } else {
                    throw new Error("Error Registering User");
                }
            }
        } catch (error) {
            return res.status(502).json({
                code: 502,
                status: "failed",
                type: false,
                error: error.message
            });
        }
    }
    async userLogin(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Invalid Email Address"
            });
        }
        if (password.length < 5) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Password Must Be At Least 8 Characters"
            });
        }
        try {
            const isExist = await User.findOne({
                user_email: email
            });
            if (isExist) {
                if (isExist.user_email === email) {
                    const isOkPassword = await auth.compareHashed(
                        password,
                        isExist.user_password
                    );
                    if (isOkPassword) {
                        var date = new Date();
                        const today = date.toDateString();
                        const username = isExist.username;
                         const id = isExist._id;
                         const u_type = isExist.user_type;
                        const token = await auth.encodeJWT({
                            username,
                            email,
                            today
                        });
                        const update = await User.findOneAndUpdate(
                            { user_email: email },
                            { user_token: token }
                        );
                        if (update) {
                            return res.status(200).json({
                                code: 200,
                                type: true,
                                userID: id,
                                 user_type: u_type,
                                token,
                                date: today,
                                status: "success",
                                success: "User Logged In Successfully"
                            });
                        } else {
                            return res.status(403).json({
                                code: 403,
                                type: false,
                                status: "failed",
                                error: "Invalid Username Or Password"
                            });
                        }
                    } else {
                        throw new Error("Invalid Email Or Password!");
                    }
                } else {
                    throw new Error("Invalid Email Or Password!");
                }
            } else {
                throw new Error("Invalid Credentials");
            }
        } catch (error) {
            return res.status(502).json({
                code: 502,
                status: "failed",
                type: false,
                error: error.message
            });
        }
    }
    async allUsers(req, res) {
        try {
            const users = await User.find();
            if (users) {
                res.json(users);
            } else {
                throw new Error("No User Found !");
            }
        } catch (error) {
            return res.status(404).json({
                code: 404,
                type: false,
                status: "failed",
                error: error.message
            });
        }
    }
}

/*------------------------------------------*/
//Exported The userController Class
let user = new userController();
module.exports = user;
