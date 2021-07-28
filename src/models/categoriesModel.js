const mongoose = require('mongoose');
const CategoriesSchema=mongoose.Schema({
name:{
    type:String,
    require:true,
},

description:{
    type:String,
    require:true,
},

createAt:{
    type:Number,
    default:Date.now,
}

});

module.exports=mongoose.model('Categories',CategoriesSchema);