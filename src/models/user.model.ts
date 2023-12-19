import {
	getModelForClass,
	modelOptions,
	prop,
	Severity,
	pre,
	DocumentType,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export enum Role {
	STUDENT = "student",
	TEACHER = "teacher",
}

class Token {
	@prop({ required: true })
	token: string;
}

@pre<User>("save", async function () {
	if (!this.isModified("password")) return;

	const hash = await argon2.hash(this.password);
	this.password = hash;
	return;
})
@modelOptions({
	schemaOptions: {
		timestamps: true,
		toJSON: {
			transform(_, ret: any) {
				ret.id = ret._id;

				delete ret._id;
				delete ret.tokens;
				delete ret.password;
			},
			versionKey: false,
		},
	},
	options: {
		allowMixed: Severity.ALLOW,
	},
})
export class User {
	@prop({ required: true, unique: true })
	email: string;

	@prop({ required: true })
	fullName: string;

	@prop({ required: true })
	password: string;

	@prop({ required: true, enum: Role, default: Role.STUDENT })
	role: Role;

	@prop({ default: null })
	profession: string;

	@prop({})
	tokens: Token[];

	async validatePassword(this: DocumentType<User>, candidatePassword: string) {
		try {
			return await argon2.verify(this.password, candidatePassword);
		} catch (error) {
			throw error;
		}
	}

	async generateAuthToken(this: DocumentType<User>) {
		try {
			const token = sign(
				{
					_id: this._id,
					email: this.email,
				},
				secret!,
			);
			this.tokens.push({ token });
			await this.save();

			return token;
		} catch (error) {
			throw error;
		}
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
