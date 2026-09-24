const express = require('express');
const app = express();

app.use(express.json());

let products = [
    {
        id: 1,
        name: "p1",
        price: 99
    },
    {
        id: 2,
        name: "p2",
        price: 88
    },
    {
        id: 3,
        name: "p3",
        price: 77
    }
];


// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
    res.json(products);
});

// CREATE PRODUCT
app.post("/api/products", (req, res) => {

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product Created",
        product: newProduct
    });
});

// GET SINGLE PRODUCT
app.get("/api/products/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if(!product){
        return res.status(404).json({
            message : "No product Found"
        });
    }
    res.json(product);
});


//update product
app.put("/api/products/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if(!product){
        return res.status(404).json({
            message : "Product does not exist"
        });
    }
    product.name = req.body.name;
    product.price = req.body.price;

    res.json({
        message : "product updated",
        product : product
    })
});

//delete product
app.delete("/api/products/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if(productIndex === -1){
        return res.status(404).json({
            message : "Product not found"
        })
    }
    const deletedProduct = products.splice(productIndex,1);
    res.json({
        message : "Product deleted",
        Product : deletedProduct[0]
    });
});


app.listen(3000, () => {
    console.log("Server is running...");
});