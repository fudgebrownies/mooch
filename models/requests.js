module.exports = function(sequelize, DataTypes) {
    var requests = sequelize.define("requests", {
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
    return requests;
};