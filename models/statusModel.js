var mongoose=  require("mongoose");
var plm = require("passport-local-mongoose");


var statusSchema = mongoose.Schema({
  
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
  
},
  {timestamps:true}
)


module.exports = mongoose.model("chat",chatSchema);