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
const allCards=async (req,res)=>{
     try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({
                message:"invalid user"
            });
        }
        return res.status(200).json({
            allCards:user.cards,
        });
     }
     catch(error){
        return res.status(500).json({
                message:"error while fetching cards",
                error:error.message,
            }); 
     }
}
const updateCard=async (req,res)=>{
    try{
        const {description}=req.body;
        const updatedCard=await User.findByIdAndUpdate(req.user.id,{
        description:description},
        {new:true},
       );
       if(!updatedCard){
        return res.status(400).json({
                message:"invalid user"
            });
       }
      return res.status(200).json({
        updatedCard
      });

    }
    catch(error){
        return res.status(500).json({
                message:"error while updating cards",
                error:error.message,
            }); 
     }
    
}
const deleteCard=async(req,res)=>{
    try{
        const cardId=req.params;
        const deletedCard=await User.findByIdAndUpdate(req.user.id,{
            $pull:{cards:{_id:cardId}}
        },
        {new:true})
        if(!deleteCard){
        return res.status(400).json({
                message:"invalid user"
            });
       }

        return res.status(200).json({
        deletedCard
      });
    
    }
    catch(error){
        return res.status(500).json({
                message:"error while deleting cards",
                error:error.message,
            }); 
     }
}


export {createCard,allCards,updateCard,deleteCard}