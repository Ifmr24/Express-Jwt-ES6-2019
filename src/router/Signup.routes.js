import express from "express";
import { SignupController } from "../controllers/Signup.controllers";
const route = express.Router();

route.post("/api/signup", SignupController);

export default route;
