const mongoose= require('mongoose');
const UserSchema = new mongoose.Schema({
name:{type: String,
      required: true
     },
email:{type: String,
       required: true
      },
password:{type: String,
          required: true
         },
date:{type: Date,
      default: Date.now
     }
});
const db_model_User = mongoose.model('db_model_User',UserSchema);
module.exports = db_model_User;





