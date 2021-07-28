const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const TopicSchema=mongoose.Schema({
categoryId:{
    type:mongoose.Types.ObjectId,
    ref:'Categories',
},

title:{
    type:String,
    require:true,
},
body:{
    type:String,
    require:true,
},

userId:{
    type:mongoose.Types.ObjectId,
    ref:'User',
},

createAt:{
    type:Number,
    default:Date.now,
}

});

module.exports=mongoose.model('Topic',TopicSchema);