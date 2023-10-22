import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

export function deserializeUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		let access_token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			access_token = req.headers.authorization.split(" ")[1];
		} else if (req.cookies.access_token) {
			access_token = req.cookies.access_token;
		}

		if (!access_token) {
			return res.status(401).json({ message: "You are not logged in" });
		}

		const decoded = verifyJwt(access_token, "accessTokenSecretKey");
		if (!decoded) {
			return res
				.status(401)
				.json({ message: "Invalid token or user doesn't exist!" });
		}

		res.locals.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
}
