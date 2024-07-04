const getNanoId = require("../utils/common.js");
const {dbModels} = require("../config/dbModel.js");
const { v4: uuidv4 } = require("uuid");
const {urlModel} = dbModels;   // In this dbModels here we get all models which we have created. urlModel is the name only of that table

const generateNewURL = async (req,res) => {
    try{
        const shortid = await getNanoId();
        const body = req.body;
        if(!body.url) return res.status(401).json({error : "url required"});
    
        const createdData = await urlModel.create({
            shortId : shortid,
            redirectURL : body.url,
            uuid : uuidv4(),
            createdAt : Date.now(),
            CreatedBy : req.user.id
        });

        return res.render("home", {id : createdData.shortId});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

// Logic behind this -> when we use Url with short Id then count will be inc. 
const redirectedURL = async (req,res) => {
    const getRedirectedurl = await urlModel.findOne({where : {shortId : req.params.shortId}});
    let {CountVisits, VisitTime} = getRedirectedurl;
    CountVisits += 1
    VisitTime = Date.now();
    const updateCountPerVisit = await urlModel.update({CountVisits, VisitTime} , {where : {shortId : req.params.shortId}});
    res.redirect(getRedirectedurl.redirectURL);  //Abhi ui nhi hone ki vjha server se redirect krva rhe hai. When Ui will be created we will do another code for 
}


 module.exports = {generateNewURL , redirectedURL};