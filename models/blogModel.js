
const mongoose= require('mongoose');
const Schema = mongoose.Schema;
/*  const UserSchema = new mongoose.Schema({   */
const blogSchema= new mongoose.Schema({
title:{type: String,
      required: true
      },
snippet:{type: String,
         required: true
        },
body:{type: String,
      required: true
     },
date:{type: Date,
      default: Date.now
     }                                         
                                      }, {timestamps: true});
const Bloog= mongoose.model("Blog",blogSchema);                                      
module.exports = Bloog;

/* const db_model_User = mongoose.model('db_model_User',UserSchema); */
/* module.exports = db_model_User; */

