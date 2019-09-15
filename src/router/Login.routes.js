import express from "express";
import { LoginController } from "../controllers/Login.controllers";
const route = express.Router();

route.post("/api/login", LoginController);

export default route;
