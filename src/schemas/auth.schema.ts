import { z } from "zod";
import { Role } from "../models/user.model";

const register = z.object({
	body: z
		.object({
			email: z
				.string({ required_error: "Email is required" })
				.email("Invalid email"),
			fullName: z.string({
				required_error: "First name is required",
				invalid_type_error: "First name must be a string",
			}),
			password: z
				.string({
					required_error: "Password is required",
				})
				.refine(
					(value) =>
						/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
							value,
						),
					`Password must contain at least 8 characters,
		        include at least one uppercase letter,
		        one lowercase letter, a number, and one special character`,
				),
			profession: z.string({}).optional(),
			role: z.nativeEnum(Role, {
				errorMap: (issue, _ctx) => {
					switch (issue.code) {
						case "invalid_type":
							return {
								message: "role: expected 'student' or 'teacher' ",
							};
						case "invalid_enum_value":
							return {
								message: "role: expected 'student' or 'teacher' ",
							};
						default:
							return { message: "role: expected 'student' or 'teacher' " };
					}
				},
			}),
		})
		.superRefine((object, ctx) => {
			if (object.role === "teacher" && !object.profession) {
				ctx.addIssue({
					message: "Profession is Required for Teachers",
					path: ["role", "profession"],
					code: z.ZodIssueCode.custom,
				});
			}
		}),
});

const login = z.object({
	body: z.object({
		email: z
			.string({ required_error: "Email is required" })
			.email("Invalid email"),
		password: z
			.string({
				required_error: "Password is required",
			})
			.refine(
				(value) =>
					/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
						value,
					),
				`Password must contain at least 8 characters,
		        include at least one uppercase letter,
		        one lowercase letter, a number, and one special character`,
			),
	}),
});

export default {
	register,
	login,
};
