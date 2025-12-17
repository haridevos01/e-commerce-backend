import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/",async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        let total = 0;

        for(let item of req.body.items){
            const product = await Product.findById(item.product).session(session);
            const inv = await Inventory.findOne({
                product:item.product
            }).session(session);


             if (!inv) {
                throw new Error(`Inventory not found for product ${item.product}`);
            }
            if(inv.stock < item.quantity) throw new Error("Out of stock");

            inv.stock -= item.quantity;
            await inv.save({session});
            total += item.quantity * product.price;
        }

        const order = await Order.create([{user:req.body.user,items:req.body.items,total}],
            {session}
        );

        await session.commitTransaction();
        res.json(order);

    }catch(error) {
        await session.abortTransaction();
        res.status(400).json({error:error.message})
    }
})
export default router;