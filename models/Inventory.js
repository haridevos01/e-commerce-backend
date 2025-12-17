import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        unique:true
    },
    stock:{type:Number,min:0}
})

export default mongoose.model("Inventory",inventorySchema);