const express = require('express')
require('./config')
const ProductMOdel = require('./Schema');
const cors = require('cors')


const app  = express();
app.use(cors())
app.use(express.json());

const path = require('path')
pathfile = path.join(__dirname,"components");

app.use(express.static(__dirname+'/components'));
app.get("",(req,res)=>{
    res.sendFile(`${pathfile}/home.html`)
});
app.post("/create",async(req,res)=>{
    
    let unique = await ProductMOdel.findOne({email:req.body.email})
    console.log(unique)
    if (unique){
        res.send({unique:"Email Alreay exist"})
    }else{
        let data = new ProductMOdel(req.body);
        let result = await data.save();
        console.log(result)
        res.send(result);
    }
    
})
app.post("/login",async(req,res)=>{
    console.log(req.body.email,req.body.password)
    let result = await ProductMOdel.findOne({email:req.body.email});
    // res.send(result)
    if (result && result.password==req.body.password){
        res.send(result)
    }else{res.send({message:"Not Found"})}


})
app.listen(5040,()=>{
    try {
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
});