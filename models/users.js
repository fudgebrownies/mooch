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
      firstName:{
        type:DataTypes.STRING
      },
      lastName:{
        type:DataTypes.STRING
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
      agreeTerms:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
      ratingRenter:{
        type:DataTypes.INTEGER,
        defaultvalue:0
    },
      ratingRentee:{
        type:DataTypes.INTEGER,
        defaultvalue:0
      },
      ratingCommunication:{
        type:DataTypes.INTEGER,
        defaultvalue:0
      },
      signedIn:{
          type:DataTypes.BOOLEAN,
          defaultValue:false
      },
      active:{
          type:DataTypes.BOOLEAN,
          defaultValue:true
      }, 
    }, {
      timestamps: true
    
    });
    return users;
  };
  
