"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CardData } from "./interfaces";

const dashboard = () => {
  const [des, setDes] = useState("");
  const [complete, setComplete] = useState(false);
  const [card, setCard] = useState<CardData[]>([]);
  const handleToggle=async(cardId:string,currentStatus:boolean)=>{
    try{
        const token=localStorage.getItem("token");
        const res=await axios.put(`http://localhost:1000/api/v1/cards/toggle-card/${cardId}`,
            {
                isCompleted:currentStatus,
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        fetchCards();
    }
    catch(error){
        console.error("Failed to update card status", error);
    }
  }
  const fetchCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:1000/api/v1/cards/get-all-cards",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Format depends on your backend
            },
          }
        );
        setCard(res.data.allCards);
      } catch (error) {
        console.error(error);
      }
    };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        description: des,
        isCompleted: complete,
      };
      const res = await axios.post(
        "http://localhost:1000/api/v1/cards/create-card",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCards();
      setDes("");
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>welcome to dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => setComplete(e.target.checked)}
        />
        <button type="submit">create</button>
      </form>

      <div>
        {card.map((item, index) => (
          <p key={index}>{item.description} <input type="checkbox" checked={item.isCompleted} onChange={(e)=>handleToggle(item._id,e.target.checked)} /></p>
        ))}
      </div>
    </>
  );
};
export default dashboard;
