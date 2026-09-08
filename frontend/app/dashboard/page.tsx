"use client"

import axios from "axios";
import {useEffect, useState} from "react";

const dashboard=()=>{
    const [des,setDes]=useState("");
    const [complete,setComplete]=useState(false);
    const [card,setCard]=useState([]);
    useEffect(()=>{
        const fetchCards=async()=>{
            try{
                const res=await axios.get("http://localhost:1000/api/v1/cards/get-all-cards",{withCredentials:true});
                setCard(res.data)
            }
            catch(error){
                console.error(error);
            }
            fetchCards();
            
        }
    },[])



    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
        const payload={
            description:des,
            isCompleted:complete,
        }
        const res=await axios.post("http://localhost:1000/api/v1/cards/create-card",payload,{withCredentials:true});
        console.log(res.data);
        }
        catch(error){
            console.error(error);
        }
        
    }

    return (
        <>
        <h1>welcome to dashboard</h1>
        <form onSubmit={handleSubmit}>
        <input type="text" value={des} onChange={(e)=>setDes(e.target.value)} />
        <input type="checkbox" checked={complete} onChange={(e)=>(setComplete(e.target.checked))}  />
        <button type="submit">create</button>
        </form>


        <div>
            {
                card.map((item)=>(
                    <p>{item.description}</p>
                ))
            }
        </div>
        </>
    )
}
export default dashboard;