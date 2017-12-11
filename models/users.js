module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      email: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false
        // len is a validation that checks that our todo is between 1 and 140 characters
      },
      password: {
        type: DataTypes.STRING
        // defaultValue is a flag that defaults a new todos complete value to false if
        // it isn't supplied one
      },
      profilePic:{
type:DataTypes.STRING
      },
      phoneNumber:{
        type:DataTypes.STRING
      },
      address:{
        type:DataTypes.STRING
      },
      
      signedIn:{
          type:DataTypes.BOOLEAN,
          defaultValue:false
      },
      active:{
          type:DataTypes.BOOLEAN,
          defaultValue:true
      }
    });
    return users;
  };
  
