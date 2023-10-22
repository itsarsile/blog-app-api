import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = res.locals.user;
		if (!user) {
			return res
				.status(401)
				.json({ message: "Session has expired or user doesn't exist" });
		}

		next();
	} catch (error) {
		next(error);
	}
}
