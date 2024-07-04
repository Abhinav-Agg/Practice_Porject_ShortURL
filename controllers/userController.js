const { where } = require("sequelize");
const { dbModels } = require("../config/dbModel");
const { authUserModel } = dbModels;
const { v4: uuidv4 } = require("uuid");
const { setUserToken } = require("../services/authServiceJwt");


const handleSignup = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;
        const createdUser = await authUserModel.create({
            UserName: fullname,
            Email: email,
            Password: password,
            Role : role
        });

        return res.send(createdUser);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
}

// Here we have 2 way to authenticate a user.
/*
1. cookie  -> we try to understand how we do authenticate a user with cookie system. And in cookie we also use key value pair system.
res.cookie("uid", token);  -> Its used when use the cookie based authentication. Cookie based Design pattern.
:- Cons of cookie based authentication -> It is good becasue it work automatically when we set but it works only in web-based application means browser based application and if use same backend in other device like 
mobile device etc so we need token based authorization becasue cookie is a feature of browser.
:- 2nd Cons in this -> we need to use memory architecture like **hashmap** to store data which we get from backend on the basis of login details. So that we don't go to server db to get details frequently.
:- In node if we store anything in the cookie we need one package cookie-parser then its possible to use.

2. header -> Here, we used token based authorization where we add data in the payload with the secret key. So, this authorization or authentication used in every application whether it is web-based or any device
based. 
Also, in this we don't need memory based architecture becuase we store the data in the payload and will use in overall application everywhere.
So, in token based authorization we use bearer as a standard because its linked with oAuth2.0.
Now, we understand how to set the token as bearer in header . And in frontend we store the token in localstorage.
*/

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const getUser = await authUserModel.findOne({
            where: {
                Email: email,
                Password: password,
            }
        });

        //(!variable) => is condition ka mtlb hota hai agr is variable mei data nhi hai toh andar jaye or na jaye.
        if (!getUser) return res.render("login", { error: "Invalid Credentials" });
        //let sessionId = uuidv4();  //By this We create uuid for this user as a sessionId when we do not use token.

        const token = setUserToken(getUser);
        // we set the token in cookie. So that we get data in anywhere from this cookies.
        res.cookie("token", token);
        return res.redirect("/");
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { handleSignup, handleLogin };