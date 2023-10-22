import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

export function signJwt(
	payload: Object,
	keyName: "accessTokenSecretKey" | "refreshTokenSecretKey",
	options: SignOptions,
) {
	if (keyName === "accessTokenSecretKey") {
		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY!, options);
	}
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY!, options);
}

export function verifyJwt(
	token: string,
	keyName: "accessTokenSecretKey" | "refreshTokenSecretKey",
) {
	try {
		let decoded;
		if (keyName === "accessTokenSecretKey") {
			decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY!);
			return decoded;
		}
		decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY!);
		return decoded;
	} catch (error) {
		return null;
	}
}
