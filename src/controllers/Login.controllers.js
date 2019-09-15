import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const path = require("path");
const fs = require("fs");

export async function LoginController(req, res, next) {
	try {
		const { email, password } = req.body;
		const userInDb = await User.findOne({ email: email });

		if (!userInDb) {
			return res.status(500).json({
				message: "Este usuario no existe"
			});
		}

		const isSamePassword = await bcrypt.compare(password, userInDb.password);

		if (isSamePassword) {
			const SECRET_KEY = fs.readFileSync(
				path.resolve(__dirname, "../keys/privateKey.pem")
			);

			const token = jwt.sign(
				{
					email: userInDb.email,
					user_id: userInDb._id
				},
				SECRET_KEY,
				{
					expiresIn: "3d",
					algorithm: "HS512"
				}
			);

			return res.status(200).json({
				token: token
			});
		} else {
			return res.status(500).json({
				message: "Email o contraseña incorrecta"
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Error desconocido (editar luego)"
		});
	}
}
