const Data = require("../models/data");

exports.getDataByUserId = async (userId) => {
    try {
        return Data.findAll({ where : { userId : userId}});
    } catch (error) {
        throw error
    }
}

exports.addData = async () => {
    try {
        
    } catch (error) {
        throw error
    }
}

exports.updateData = async (id, status, comment) => {
    try {
        let data = await Data.findByPk(id);
        if(data){
            data = await data.update({
                status : status,
                comment : comment
            })
        }
        return data
    } catch (error) {
        throw error
    }
}

exports.delete = async (id) => {
    try {
        
    } catch (error) {
        throw error
    }
}