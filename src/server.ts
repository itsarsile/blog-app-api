import express, { Application } from "express";
import "dotenv/config";
import rootRouter from "./config/routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'
export const app: Application = express();
const port = process.env.PORT || 8080;

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}))
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.json());
app.use(rootRouter);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
