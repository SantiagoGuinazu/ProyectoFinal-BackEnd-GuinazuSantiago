import express from "express";
import products from "./src/routers/products.js"
import carts from "./src/routers/carts.js"

const app = express();
const port = 8080;

app.use(express.json())

app.use("/api/products", products);
app.use("/api/carts", carts);

app.get("/", function (req, res) {
    return res.send("Solución laboratorio 3")
});

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});