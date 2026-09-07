import {useState} from "react";
import type { FormEvent } from "react";
import axios from "axios"

const login=()=>{
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const handleLogin=((e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("email",email);
    formData.append("password",password);
    axios.post("http://localhost:1000/api/v1/users/login",formData)
    .then((res)=>{
        console.log(res.data);
    })
    .catch((error)=>{
        console.error(error.message);
    })

})

    return (
        <>
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
            <button type="submit">login</button>

        </form>
        
        </>
    )


}
export default login;