
//Export defined table to api routes 
module.exports = function(sequelize, DataTypes) {
    var product = sequelize.define("product", {
        category:{
            
                type:DataTypes.STRING},
            product_name:{type: DataTypes.STRING},
            
                product_description:{type: DataTypes.STRING},
                userUploadImage1:{ type: DataTypes.STRING},
                userUploadImage2:{type: DataTypes.STRING}
                
    
    });
    return product;
  };
  