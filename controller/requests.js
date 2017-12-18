module.exports = function(sequelize, DataTypes) {
    var request = sequelize.define("request", {
        emailRequester:{
            type:DataTypes.STRING
        },
        emailRequestee:{
            type:DataTypes.STRING
        },
        productId:{
            type:DataTypes.INTEGER
        },

                
    });
    return request;
};