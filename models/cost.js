

//Export defined table to api routes 
module.exports = function(sequelize, DataTypes) {
    var rental = sequelize.define("rental_cost", {
        product:{
type: DataTypes.STRING
        },
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
    return rental;
  };
  



 