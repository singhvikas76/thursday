const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require("dotenv").config();

const app = express();

app.use(express.json());

//Connection with MONGO DB Database
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Sucess");
    }catch(error){
        console.log("Something went wrong");
    }
    
}
connectDB();

// get all products
app.get("/api/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);

});

//get product by id
app.get("/api/products/:id", async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

});

// Insert new Product
app.post("/api/products", async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);

});

// update a product
app.put("/api/products/:id", async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            price: req.body.price
        },
        {
            new: true
        }
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

});

//delete a product
app.delete("/api/products/:id", async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json({
        message: "Product deleted"
    });

});


app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});