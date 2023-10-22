import express from "express";
import { authRouter } from "../features/auth/auth.routes";
import { articleRouter } from "../features/articles/articles.routes";

const rootRouter = express();

// Mount routes
rootRouter.use("/auth", authRouter).use("/articles", articleRouter);
export default rootRouter;
