import express from "express";
import hbs from "hbs";
import products from "./src/routers/products.js";
import carts from "./src/routers/carts.js";
import initial from "./src/routers/initial.js";
import __dirname from "./src/utils/utils.js";

const app = express();
const port = 8080;

app.use(express.static("public"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.json());

app.use("/api/products", products);
app.use("/api/carts", carts);
app.use("/", initial);

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});