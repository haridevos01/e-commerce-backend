import express from "express";
import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";


const router = express.Router();


//create product

router.post("/",async(req,res)=>{
    const product = await Product.create(req.body);
    await Inventory.create({product:product._id,stock:10});
    res.json(product);
});

//get products

router.get("/",async(req,res)=>{
    const {min,max} = req.query;
    const products = await Product.find({
       price:{$get:min || 0,$lte:max || 999999 }
    });
       res.json(products);
    
});
export default router;