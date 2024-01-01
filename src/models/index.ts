import { getModelForClass } from "@typegoose/typegoose";
import { Attachment, Category, Course } from "./course.model";
import { User } from "./user.model";

export const CourseModel = getModelForClass(Course);
export const AttachmentModel = getModelForClass(Attachment);
export const CategoryModel = getModelForClass(Category);
export const UserModel = getModelForClass(User);

