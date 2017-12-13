
//Export defined table to api routes 
module.exports = function(sequelize, DataTypes) {
    var products = sequelize.define("products", {
        email:{
            type:DataTypes.TEXT
        },
        category:{
            
                type:DataTypes.STRING},
            product_name:{type: DataTypes.STRING},
            
                product_description:{type: DataTypes.STRING},
                userUploadImage1:{ type: DataTypes.STRING},
                userUploadImage2:{type: DataTypes.STRING},
                daily:{
                    type:DataTypes.INTEGER
                },
                weekly:{
                    type:DataTypes.INTEGER
                },
                monthly: {
                    type:DataTypes.INTEGER
                },
                security_deposit:{
                    type:DataTypes.INTEGER
                }
    
    });
    return products;
  };
  