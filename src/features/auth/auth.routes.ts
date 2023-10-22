import { Router } from "express";
import { login, logout, register } from "./auth.controller";

export const authRouter = Router();

authRouter.post("/register", register).post("/login", login).get('/logout', (req, res) => {
	logout(res)
});
