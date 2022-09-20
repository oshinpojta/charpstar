const dataServices = require("../services/data-services");

exports.getDataByUserId = async (req, res, next) => {
        try {
            let user = {
                id : req.user.id,
                name : req.user.name,
                designation : req.user.designation
            };
            if(req.body.id){
                user.id = req.body.id;
            }
            let data = await dataServices.getDataByUserId(user.id);
            res.json({success : true, data : data, user : user});
            
        } catch (error) {
            console.log(error);
            res.json({ success : false, error : error})
        }
}

exports.updateData = async (req, res, next) => {
    try {
        let body = req.body;
        let status = body.status == "yes" ? 1 : 0;
        let comment = body.comment;
        let data = await dataServices.updateData(body.id, status, comment);
        res.json({success : true, data : data});
    } catch (error) {
        console.log(error);
        res.json({ success : false, error : error})
    }
}