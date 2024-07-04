require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const {validateAuthUserToken , restrictUserBasedOnRole} = require("./middleware/authMiddleware");
const app = express();
const port = 4000;
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/users");
const path = require("path");

// db
const {connection, databaseSync} = require('./config/db');
connection();
databaseSync();

//view engine.
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares -> As this way we use Middlewares. And If we call any middleware globally we need to add conditions in that functions. Or more concepts please review the code of middlware functions.
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());   //that's why we use cors. Isliye enable this.
app.use(cookieParser());
app.use(validateAuthUserToken);

// Router
// Router mei agr hum http methods ko use kr rhe hai it means we are creating api method. 
// why we not give here api when it is already an api router. But here we do server side rendering so need to give like that router. Because its used as url that's why !.
app.use("/", restrictUserBasedOnRole(), staticRouter);
app.use("/api/auth", userRouter);
app.use("/url", urlRouter);  

 

app.listen(port, () => {
    console.log(`app listening on this port ${port}`);
})