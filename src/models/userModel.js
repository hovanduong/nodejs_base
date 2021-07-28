const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')
const UserSchema=mongoose.Schema({
name:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
    select:false,
},
createAt:{
    type:Number,
    default:Date.now,
}
});
UserSchema.pre('save',async function(next) {
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
    next();
    
})
module.exports=mongoose.model('User',UserSchema);