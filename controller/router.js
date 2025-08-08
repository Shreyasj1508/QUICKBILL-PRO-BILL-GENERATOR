const easyinvoice = require("easyinvoice");
const express = require("express");
const router = express.Router();
const Bills = require("../model/billing")
const url = require('url'); 



router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/print',(req,res)=> { 
   
     // Extract variables from query
     const { Name, Email, PhnNo, items } = req.query;
     // items may be a single string or array
     let itemsArr = [];
     if (Array.isArray(items)) {
         itemsArr = items;
     } else if (typeof items === 'string') {
         itemsArr = [items];
     }
     res.render("print", {
         Name,
         Email,
         PhnNo,
         items: itemsArr
     });
})

router.post('/submit', (req,res)=>{
 
    Bills(req.body).save();
    res.redirect(url.format({
       pathname:"/print",
       query:req.body,
     }))
});

module.exports = router;