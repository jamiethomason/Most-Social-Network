const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText:{
        type:String,
        required:true,
        maxlength:280
    },
    createdAt:{
        type:Date,
        default:()=>new Date(),
        get:timestamp => dateFormat(timestamp)
    },
    username:{
        type:String,
        required:true
    },
    reactions:[reactionSchema]
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
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return reactions.length;
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;