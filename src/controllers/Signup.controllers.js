import bcrypt from "bcryptjs";
import User from "../models/User";

const BCRYPT_SALT_ROUNDS = 12;

export async function SignupController(req, res, next) {
	try {
		const { email, password } = req.body;

		const verifyEmail = await User.findOne({ email: email });

		if (verifyEmail) {
			return res.status(500).json({
				message: "Email ya registrado",
				field: "email"
			});
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

		const newUser = new User({
			email: email,
			password: hashedPassword
		});

		await newUser.save();

		return res.status(200).json({
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Error desconocido (editar luego)"
		});
	}
}
