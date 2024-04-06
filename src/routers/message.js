import { Router } from "express";
import { check } from "express-validator";
import { validarCampos, validarJWT } from "../middleware/auth.js";
import { getMessages } from "../controllers/message.js";

const router = Router();

router.get("/chat",[
    validarJWT,
    validarCampos,
], getMessages);

export { router as messageRouter };