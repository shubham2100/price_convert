import React, { useEffect, useState } from 'react';
import axios from 'axios';
import data from './data.json';
import './products.css';

const currency_option=["INR","USD"];
const API_KEY="b40ade29953424d5c0535a415422b500";

export default function Product(){
    const [currency,setCurrency]=useState("INR");
    const [currencyRate,setCurrencyrate]=useState(null);

    useEffect(()=>{
        axios.get(`http://api.exchangeratesapi.io/latest?access_key=${API_KEY}&base=EUR`).then((res)=>{
           setCurrencyrate(res.data && res.data.rates && res.data.rates[currency]);
        }).catch((err)=>{
            console.log(err);
        })

    },[currency]);

    return(
        <div className="div-products">
            <div className="cards">
                {data.map((item)=>{
                    return(
                        <div className="each-card" key={item.id}>
                            <div className="product-image"><img loading="lazy" src={item.image} alt="unable to load"></img></div>
                            <div className="product-name">{item.product_name}</div>
                            <div className="product-price">{Math.round(item.price*currencyRate)} {currency}</div>
                        </div>
                    )
                })}
                <div className="select-currency">
                <select onChange={(e)=>setCurrency(e.target.value)} defaultValue={currency}>
                    {currency_option.map((amount,index)=><option key={index}>
                        {amount}
                    </option>)}
                </select>
                </div>
            </div>
        </div>
    )
}