import { db } from "../../config/db";
import _ from "lodash";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { user } from "../../schema/users";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signJwt } from "../../utils/jwt";

const cookiesOptions: CookieOptions = {
	httpOnly: true,
	sameSite: "lax",
};

const accessTokenCookieOptions: CookieOptions = {
	...cookiesOptions,
	expires: new Date(Date.now() + 15 * 60 * 1000),
	maxAge: 15 * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
	...cookiesOptions,
	expires: new Date(Date.now() + 15 * 60 * 1000),
	maxAge: 60 * 60 * 1000,
};

export async function register(req: Request, res: Response) {
	try {
		const { username, password, role } = req.body;

		// Check existing username
		const isExist = await db
			.select()
			.from(user)
			.where(eq(user.username, username));

		if (isExist.length > 0) {
			return res.status(400).json({ message: "User already exist!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.insert(user).values({
			username,
			password: hashedPassword,
			role,
		});

		return res.status(200).json({ message: "User registration success!" });
	} catch (error: any) {
		return res.status(500).json({ error });
	}
}

export async function login(req: Request, res: Response) {
	try {
		const { username, password } = req.body;
		const [userRes] = await db
			.select()
			.from(user)
			.where(eq(user.username, username));
		if (!userRes || !(await bcrypt.compare(password, userRes.password))) {
			return res
				.status(400)
				.json({ message: "Username or password is incorrect!" });
		}

		const userWoPassword = _.omit(userRes, ["password"]);

		const access_token = signJwt(userWoPassword, "accessTokenSecretKey", {
			expiresIn: "1h",
		});
		const refresh_token = signJwt(userWoPassword, "refreshTokenSecretKey", {
			expiresIn: "2h",
		});

		res.cookie("access_token", access_token, accessTokenCookieOptions);
		res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);

		return res.status(200).json({ message: "Login success!" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}


export async function logout(res: Response) {
	try {
		res.cookie("access_token", "", {maxAge: -1})
		res.cookie("refresh_token", "", {maxAge: -1})
		return res.status(200).json({message: "Success!"})
	} catch (error) {
		return res.status(500).json({ message: "Internal server error: logging out"})
	}
}
