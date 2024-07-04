//const setSessionIdForUser = new Map();  // This is a stateful which we remove due to a problem which i explained in authServiceStateMemory.
const jwt = require("jsonwebtoken");
const secretKey = "Abhi$#1724@#_0205&lucky";
/* 
Here is the reason why we give secretKey :- Because we store the token in cookies or headers/response in the browser by this if hackers changed the data by this jwt token will
be changed and when it saved that token so our code verify that this token is correct or not with our secret key. Hacker or user don't know what wa the secret key they add
random secret key with changed data and then they add. That's why we verify it and if its false we logout the application and return back to sign in.
-> So this was whole concept behind that secret key used with token that's why we create the token with secret key as well for verification.. Otherwise application will be hacked.
*/

const setUserToken = (User) => {
    // for jwt we require a payload means we store data main data.
    const payload = {
        id: User.id,
        email: User.Email,
        fullname: User.UserName,
        role : User.Role
    }

    return jwt.sign(payload, secretKey);  // so sign means create token with secretKey.
    // Here why give secretkey with data -> you will get answer below.
}

const getTokenUser = (token) => {
    try {
        if (!token) return null;
        return jwt.verify(token, secretKey);
        // This verify method first verify the token with secret key and then decode the token after this return the data which we added in their payload.
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = { setUserToken, getTokenUser };

// By this if we refresh the page we remain logged in because we give data in token and Token will be expired when we set the expiry or close the browser or logout.
// with token user application bhi correct work kregi.
