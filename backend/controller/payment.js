require('dotenv').config()
const Razorpay = require('razorpay');
var crypto = require("crypto");


const payment ={
    orders:async (req,res) =>{
        try {
            var {a} = req.body;
            var instance = new Razorpay({ key_id: process.env.id, key_secret: process.env.secret})

        var options = {
            amount: a*100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "Rachappa"
        };

        instance.orders.create(options, function(err, order) 
        {
            if(err)
            {
                return res.status(500).json({msg: "Razorpay server is busy"})
            }
            console.log(order);
            res.json({order})
        });
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },
    
    verfiy: (req,res) =>{
        console.log("statred")
        try {

            console.log("1")
                let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
                console.log("2")
                var expectedSignature = crypto.createHmac('sha256', process.env.secret).update(body.toString()).digest('hex');
                console.log("3")
                if(expectedSignature === req.body.response.razorpay_signature)
                {
                    return res.status(200).json({msg:"donme "})
                }
                return res.status(500).json({msg: err.message})

            }
        catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }

    } 
}



module.exports = payment