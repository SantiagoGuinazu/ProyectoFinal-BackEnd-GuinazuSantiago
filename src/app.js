import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import { productsRouter, cartsRouter, authRouter, ticketsRouter } from "./routers/index.js";

import __dirname from "./utils.js";
import { dbConnection } from "./database/config.js";
import { logger } from "./utils/logger.js";
import { requestUrl } from "./middleware/logger.js";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(cors());
app.use(requestUrl);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 8080;

const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Documentacion de la Api",
            description: "Proyecto Ecommerce - Santiago Guiñazu"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};
const spec = swaggerJsDoc(swaggerOptions);

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/documentacion-api", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://guinazusantiago-ecommerce-front.netlify.app"
        //origin: "http://localhost:5173/"
    }
});

await dbConnection();

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("mensaje", (body) => {
        console.log(body);
        socket.broadcast.emit("mensaje", {
            body,
            from: socket.id.slice(6)
        });
    })
});

//app.listen(PORT, () => { logger.info(`Corriendo en el puerto ${PORT}`) });
server.listen(PORT, () => { logger.info(`Corriendo en el puerto ${PORT}`) });