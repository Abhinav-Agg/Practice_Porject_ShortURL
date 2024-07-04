// Its a middleware which means if everything fine we go to next function.
const { getTokenUser } = require("../services/authServiceJwt");

/*
Scope -> This middleware created so that we just before callback function that's why we created. We validate the user on the basis of cookie-tokken if we used cookie-based architecture. if we used token based architecture
so, we validate the token and then data which we get from toekn.
*/

// Note -> In Middlewares, if we use inline middleware or global redirection can not work. we need to use next function then next callback function call.

/* Token based architecture -> which saved in cookies. */
const validateAuthUserToken = (req, res, next) => {
    // Now we call this middleware in globally and with redirect it will not work that's why we use next. Because as we know next() means jump onnext function or next line. where we already redirect that if no user redirect to login.
    if (!req.cookies || !req.cookies.token) return next();  
    const token = req.cookies.token;
    req.user = getTokenUser(token);
    next();
}


function restrictUserBasedOnRole() {
    return function (req, res, next){
        if(!req.user) return next();
        if (req.user.role.toLowerCase() === 'normal') return res.end("Unauthorized");
        return next();
    }
}

module.exports = { validateAuthUserToken, restrictUserBasedOnRole };

/* Cookie based authentication function. -> Cookie based design pattern.
const restrictUserWithoutUid = (req,res,next) => {
    const cookieUid = req.cookies?.uid;
    
    if(!cookieUid) return res.redirect("/auth/Login");

    const user = getUser(cookieUid);
    if(!user) return res.redirect("/auth/Login");

    req.user = user;

    next();
}

} 

const checkAuth = (req,res,next) => {
    const cookieUid = req.cookies?.uid;

    const user = getTokenUser(cookieUid);

    req.user = user;

    next();
}

*/



