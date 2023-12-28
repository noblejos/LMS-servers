import { modelOptions, prop, Severity, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Category {
	@prop({ required: true })
	name: string;
}

export class Attachment {
	@prop({ required: true })
	name: string;

	@prop({})
	url: string;
}

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
export class Course {
	@prop({ required: true, ref: () => User })
	user: Ref<User>;

	@prop({ required: true })
	title: string;

	@prop({})
	description: string;

	@prop({})
	imageUrl: string;

	@prop({})
	price: Number;

	@prop({ default: false })
	isPublished: boolean;

	@prop({ ref: () => Category })
	category: Ref<Category>;

	@prop({ ref: () => Attachment })
	attachment: Ref<Attachment>;
}
