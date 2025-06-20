const express = require('express');
const router = express.Router();

const products = [
     { 
        "id": 1, 
        "name": "Bluetooth Kulaklık", 
        "price": 599, 
        "description": "Kablosuz, hızlı şarj, kaliteli ses" 
    }, 
    { 
        "id": 2, 
        "name": "Dizüstü Bilgisayar", 
        "price": 17999, 
        "description": "16GB RAM, SSD, 15.6'' ekran" 
    }
];

router.get('/products',(req,res)=>{
    res.json(products);
});

module.exports = router;