import mongoose from "mongoose";
 
const poductSchema = new mongoose.Schema({
    name:{type:String,index:true},
    category:{type:String,index:true},
    price:{type:Number,min:1},
    active:{type:Boolean,default:true}
});

poductSchema.index({price:1,category:1});

export default mongoose.model("Product",poductSchema)