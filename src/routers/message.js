import { Router } from "express";
import { validarCampos, validarJWT } from "../middleware/auth.js";
import { getMessages } from "../controllers/message.js";

const router = Router();

router.post("/chat",[
    validarJWT,
    validarCampos,
], getMessages);

export { router as messageRouter };