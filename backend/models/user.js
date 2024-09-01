const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_name: String,
    user_email: {
        type: String,
        required: true
    },
    user_password: String,
    user_avtar: String,
    user_token: String,
    user_type : String,
    });

const User = mongoose.model("User", userSchema);

module.exports = User;
