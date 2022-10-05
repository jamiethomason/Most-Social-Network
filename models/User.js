const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username:{
        type:String,
        unique:true,
        required:true,
        trimmed:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        //Must match a valid email address (look into Mongoose's matching validation)
    },
    thoughts:[
      {type:Schema.Types.ObjectId,ref:'Thought'}
    ],
    friends:[
      {type:Schema.Types.ObjectId,ref:'User'}
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;