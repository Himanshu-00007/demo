"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:1000/api/v1/users/login",
        payload,
        {
          withCredentials: true,
        }
      );
      const token = res.data.token;
      console.log(res.data.token);
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      console.error("login failed", error);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
};
export default login;
