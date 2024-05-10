var mongoose=  require("mongoose");
var plm = require("passport-local-mongoose");



var userSchema = mongoose.Schema({
  
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  is_online:{
    type:String,
    default: '0'
  },
  password:String,


 
},
  {timestamps:true}
)
userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema);