import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { successfulRequest } from "../helpers/responses";
import { BadRequestError } from "../errors/bad-request-error";

const register = async (req: Request, res: Response) => {
	const rqb = req.body;

	const { password, role, fullName, email } = rqb;
	try {
		const user = await UserModel.create({
			fullName,
			email,
			password,
			role,
			...(rqb.role === "teacher" && { profession: rqb.profession }),
		});

		const token = await user.generateAuthToken();

		successfulRequest({
			res,
			message: "User Registration Complete",
			data: { user, token },
		});
	} catch (error: any) {
		if (error?.code == 11000) {
			let errMsg = Object.keys(error.keyValue)[0] + " already exists.";
			throw new BadRequestError(`${errMsg}`);
		}
		throw error;
	}
};

const login = async (req: Request, res: Response) => {
	const rqb = req.body;
	const { password, email } = rqb;
	try {
		const user = await UserModel.findOne({
			email,
		});

		if (!user) throw new BadRequestError(`Incorrect Email or Password`);

		const _isValidated = await user.validatePassword(password);
		if (!_isValidated) throw new BadRequestError(`Incorrect  Password`);

		const token = await user.generateAuthToken();

		successfulRequest({
			res,
			message: "User Authenticated",
			data: { user, token },
		});
	} catch (error) {
		throw error;
	}
};
export default { register, login };
