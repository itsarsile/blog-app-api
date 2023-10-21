import express, { Application } from "express";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({ message: "Hello world!" });
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
