import supertest from "supertest";
import { logger } from "../src/utils/logger.js";

const request = supertest("http://127.0.0.1:8080");

describe("Testing Users",()=>{
    
    describe("LoginTest", async()=>{
        const user = {
            email:"santi@santi.com",
            password:"123456",
        }
        const {statusCode, ok, body} = await request.post("/api/auth/login").send(user);
        logger.info(statusCode);
        logger.info(ok);
        logger.info(JSON.stringify(body));
    });

    describe("RegisterTest", async()=>{
        const user = {
            name:"",
            lastName:"",
            email:"",
            password:"",
        };
        
        const {statusCode, ok, body} = await request.post("/api/auth/register").send(user);
        logger.info(statusCode);
        logger.info(ok);
        logger.info(JSON.stringify(body));
    });
});



