import { Router } from "express";
import {
	create_article,
	delete_article,
	get_articles,
	get_articles_by_id,
	get_articles_by_user_id,
	update_article,
} from "./articles.controller";
import { deserializeUser } from "../../middleware/deserializeUser";
import { requireUser } from "../../middleware/requireUser";

export const articleRouter = Router();

articleRouter
	.post("/", deserializeUser, requireUser, create_article)
	.get("/", get_articles)
	.get("/user/:userId", get_articles_by_user_id)
	.get("/:articleId", get_articles_by_id)
	.put("/:articleId", deserializeUser, requireUser, update_article)
	.delete("/:articleId", deserializeUser, requireUser, delete_article);
