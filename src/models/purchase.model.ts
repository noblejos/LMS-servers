import { Severity, modelOptions, prop } from "@typegoose/typegoose";
import { Ref } from "react";
import { User } from "./user.model";
import { Course } from "./course.model";

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
export class Purchase {
	@prop({ required: true, ref: () => User })
	user: Ref<User>;

	@prop({ required: true, ref: () => Course })
	course: Ref<Course>;
}
