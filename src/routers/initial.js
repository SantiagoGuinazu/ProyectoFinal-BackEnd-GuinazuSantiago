import { Router } from "express";

const router = Router()

router.get("/products", (req,res) => {
    return res.render("productos")
})

router.get("/real-time-products", (req,res) => {
    return res.render("productos-real-time")
})

router.get("*", (req,res) => {
    return res.render("404")
});

export default router;