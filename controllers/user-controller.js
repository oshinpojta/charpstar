const UserService = require("../services/user-services");
const jwt = require('jsonwebtoken'); //require('crypto').randomBytes(64).toString('hex') --> type in node
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userService = new UserService();
function generateAccessToken(userId) {
    return jwt.sign(userId, process.env.TOKEN_SECRET, {});
}

exports.loginUserByEmailAndPassword = async (req, res, next) => {
    try {
        let body = req.body;
        console.log(body);
        let user = await userService.findUserByEmail(body.email);
        if(user!=null){
            const token = generateAccessToken(user.id);
            res.json({success : true, token : token, user : { id : user.id, name : user.name, designation : user.designation}});
        }else{
            res.status(404).json({success : false, data : "Email or Password Invalid!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, data : "Internal Server Error!"});
    }
}


exports.addUser = async (req, res, next ) => {
    try {

        let body = req.body;
        console.log(body);
        let passwordHash = await bcrypt.hash(body.password, saltRounds);
        let response  = await userService.addUser(body.name, body.email, passwordHash, body.phone, body.designation);
        res.json({success : true});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({success : false, data : error});
    }
}

exports.logoutUser = async (req, res, next) => {
    try{
        req.user = null;
        res.json({success : true});
    }catch(error){
        console.log(error);
        res.status(404).json({success : false, data : error});
    }
}

exports.getAllByDesignation = async (req, res, next) =>{
    try {
        let result = await userService.findByAllClients();
        res.json({success : true, data : result});
    } catch (error) {
        console.log(error);
        res.status(404).json({success : false, data : error});
    }
}

exports.checkUserExists = async (req, res, next) => {
    try{
        let body = req.body;
        let users = await userService.findUserByEmail(body.email);;
        //console.log(users)
        if(users.length>0){
            res.json({success: true});
        }else{
            res.json({success : false, data : "User Not Found!"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({success : false, data : "Server Error"})
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
} 

exports.deleteUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}