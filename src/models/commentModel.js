const mongoose = require('mongoose');
const CommentSchema=mongoose.Schema({

topicId:{
    type: mongoose.Types.ObjectId,
    ref:'Topic',
},

content:{
    type:String,
    require:true,
},

userId:{
    type: mongoose.Types.ObjectId,
    ref:'User',
},

createAt:{
    type:Number,
    default:Date.now,
}

});

module.exports=mongoose.model('Comment',CommentSchema);