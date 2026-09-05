import Card from "../models/card.model.js";
import User from "../models/user.models.js"

const createCard=async (req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        const {description}=req.body;
        if(!description){
            return res.status(400).json({
                message:"description is required"
            });
        }
        const card=new Card({
            description:description,
            type:req.user.id,
        })
        user.cards.push(card);
        await user.save();
        await card.save();
        return res.status(400).json({
            card,
            message:"crad created successfully"
        });
    }
    catch(error){
        return res.status(500).json({
                message:"error while creating cards",
                error:error.message,
            });
    }
}


export {createCard}