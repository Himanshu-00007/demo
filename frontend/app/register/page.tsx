"use client"
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
const register=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        const payload = {
            name: name,
            email: email,
            password: password
        };
            axios.post("http://localhost:1000/api/v1/users/register", payload, {
            withCredentials: true 
        })
            .then((res)=>{
                console.log(res.data);

            })
            .catch((error)=>{
                console.error(error);
            })
    }
    return (
        <>
        <form onSubmit={handleSubmit} >
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">register</button>
        </form>
        
        
        </>
    )
}

export default register;