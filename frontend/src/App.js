import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios  from 'axios';

import { useState } from 'react';
function App() {
 const [a,seta] = useState(0)
 const [order,setorder] = useState("hi")
const handleopenrazorpaysite=async(data)=>{
  var options = {
    key: "rzp_test_XNdaPboetoEHnm", 
    amount:Number(data.amount) , 
    currency: "INR",
    name: "E-pooja samagari",
    description: "Test Transaction",
    image: "https://www.vecteezy.com/free-vector/community-logo",
    order_id:data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:function (response){
        axios.post('http://localhost:3001/verfiy',{response:response}).then((res)=>{
          console.log(res)
        }).catch(err =>{console.log(err)})
    }
  }
  var rzp1 = new window.Razorpay(options);
  rzp1.open()
}


 const handleSubmit = async e => {
  e.preventDefault()
  try{
     await  axios.post('/orders',{a}).then((res)=>{
      handleopenrazorpaysite(res.data.order)
      setorder(res.data.order.id)

    })

   
  }catch(err)
  {
      alert(err.response.data.msg)
  }

}

  return (
    <div className="App" >
        <form onSubmit={handleSubmit}>
        <div>
          <label>Amount  :</label>
          <input type='number' value={a} onChange={(e)=>{seta(e.target.value)}}/>
        </div>
      <button type='submit'>Pay</button>
      </form>
      <div>
        {order}
      </div>
    </div>
  );
}

export default App;
