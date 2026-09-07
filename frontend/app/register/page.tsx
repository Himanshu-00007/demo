"use client"
import type { FormEvent } from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
const register=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",name);
        formData.append("email",email);
        formData.append("password",password);
            axios.post("http://localhost:1000/api/v1/users/register",formData)
            .then((res)=>{
                console.log(res.data);

            })
            .catch((error)=>{
                console.error(error.message);
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