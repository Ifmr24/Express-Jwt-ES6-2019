require("dotenv").config();
import express from "express";
import Mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import AuthToken from "./middlewares/AuthToken";

//  Routes
import Login from "./router/Login.routes";
import Signup from "./router/Signup.routes";

const app = express();

Mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

let init = () => {
	// Middlewares
	app.use(json());
	app.use(urlencoded({ extended: false }));

	// Rutas
	app.use(Login);
	app.use(Signup);
	//app.use(AuthToken, Test);

	// Sets
	app.set("port", process.env.PORT || 5000);

	// Ponemos el servidor a la escucha
	app.listen(app.get("port"), () => {
		console.log("Servidor api en el puerto 5000 !");
	});
};

init();
