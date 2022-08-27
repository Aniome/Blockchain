import Express, { Router } from "express";
import Controller from "./Controller.js";

const router = new Router();

router.post("/mine", Controller.mine);
router.get("/chain", Controller.chain);
router.post("/nodes/register", Controller.nodes_register);
router.get("/nodes/resolve", Controller.nodes_resovle);
router.post("/checkqr", Controller.checkqr);

export default router;
