const express = require("express")
const app = express()



const products = [
    {id: "P1", name: "product1", cost: 1000.0},
    {id: "P2", name: "product2", cost: 5000.0},
    {id: "P3", name: "product3", cost: 3000.0},
    {id: "P4", name: "product4", cost: 1000.0},
    {id: "P5", name: "product5", cost: 2000.0},
    {id: "P6", name: "product6", cost: 14000.0},
    {id: "P7", name: "product7", cost: 10500.0},
    {id: "P8", name: "product8", cost: 12000.0},
    {id: "P9", name: "product9", cost: 11000.0},
    {id: "P10", name: "product10", cost: 123000.0},
]


app.get("/productsList", (req,res) =>{
    res.json(products);
})



app.get("/productsFiltering", (req,res) =>{
    const filters = req.query;
    const filteredProducts = products.filter(product => {
    let isPresent = true;
    for (key in filters) {
      console.log(key, product[key], filters[key]);
      isPresent = isPresent && product[key] == filters[key];
    }
    return isPresent;
  });
  
    res.json(filteredProducts);
})

app.get("/productsPagination", (req,res) =>{
    const page = req.query.page;
    const limit = req.query.limit;
    const start = (page - 1) * limit
    const end = page * limit
    const result = products.slice(start,end)
    res.json(result);
})



app.get("/products", (req,res) =>{
    products.sort(function (x, y) {
        return x.cost - y.cost;
    }).reverse();
    
    res.json(products);
})



app.listen(4000,() =>{
    console.log("server started at 4000")
});