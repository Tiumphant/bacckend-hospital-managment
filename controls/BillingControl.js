const Billing = require("../model/BillingModel")
const express = require("express")
const route = express.Router()
route.use(express.json())

const handleError = (req, err)=>{
    res.status(500).send({message:"error", err: err.message})
}
route.get("/billing", async (req,res) =>{
    try{
    let result = await Billing.find()
    console.log("get billing api");
    res.status(201).send(result)
    } catch(err){
        handleError(err)
    } 
})
route.post("/billing", async (req, res) => {
    try {
        const billing = new Billing(req.body);
        await billing.save();
        res.status(201).json({ message: "Billing created successfully", billing });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports= route