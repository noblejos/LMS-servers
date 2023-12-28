import { getModelForClass } from "@typegoose/typegoose";
import { Attachment, Category, Course } from "./course.model";
import { User } from "./user.model";

const CourseModel = getModelForClass(Course);
const AttachmentModel = getModelForClass(Attachment);
const CategoryModel = getModelForClass(Category);
const UserModel = getModelForClass(User);

export default {
	CourseModel,
	AttachmentModel,
	CategoryModel,
	UserModel,
};
