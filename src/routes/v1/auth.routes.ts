import express from "express";

// import schemas from "../../schemas/business.schema";
import controllers from "../../controllers/auth.controllers";

import { validateRequest } from "../../middlewares/validateRequest";
import schema from "../v1/../../schemas/auth.schema";

const router = express.Router();

// GET Requests

// POST Requests
router.post(
	"/register",
	validateRequest(schema.register),
	controllers.register,
);
router.post("/login", validateRequest(schema.login), controllers.login);

export default router;
