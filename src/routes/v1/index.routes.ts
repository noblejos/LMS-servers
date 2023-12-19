import express from "express";

import { validateRequest } from "../../middlewares/validateRequest";

import authResources from "../v1/auth.routes";

export const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (_, res) => res.send("OK"));

/**
 *
 * GET v1/docs
 */
// router.use("/docs", express.static("docs"));

router.use("/auth", authResources);

export default router;
