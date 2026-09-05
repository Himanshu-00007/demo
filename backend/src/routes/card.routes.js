import Router from "express";
import {verifyJwt} from "../middlewares/userAuth.js"
import { allCards, createCard, deleteCard, updateCard } from "../controllers/card.controllers.js";
const router=Router();


router.route("/create-card").post(verifyJwt,createCard);
router.route("/get-all-cards").get(verifyJwt,allCards);
router.route("update-card").patch(verifyJwt,updateCard);
router.route("delete-card").delete(verifyJwt,deleteCard);
export default router;
