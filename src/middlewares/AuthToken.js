import jwt from "jsonwebtoken";
const path = require("path");
const fs = require("fs");

let AuthToken = async (req, res, next) => {
	let Bearer = req.headers["authorization"];
	if (Bearer) {
		let PUBLIC_KEY = fs.readFileSync(
			path.resolve(__dirname, "../keys/publicKey.pem")
		);

		let token = Bearer.split(" ")[1];

		if (!token) {
			return res.json({ err: "No enviaste el token" });
		}

		jwt.verify(token, PUBLIC_KEY, (err, decode) => {
			if (err) {
				return res.json({ err: "Token no valido" });
			}

			req.token = token;
			req.tokenId = decode.id;

			return next();
		});
	} else {
		return res.json({
			err: "No enviaste el token, o el formato no es valido"
		});
	}
};

export default AuthToken;
