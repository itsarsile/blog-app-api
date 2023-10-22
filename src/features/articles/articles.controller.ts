import { Request, Response } from "express";
import { db } from "../../config/db";
import { article } from "../../schema/article";
import { eq } from "drizzle-orm";

export async function create_article(req: Request, res: Response) {
	try {
		const { title, tags, content } = req.body;
		const user = res.locals.user;

		await db.insert(article).values({
			title,
			tags,
			content,
			author_id: user.id,
		});

		return res.status(201).json({ message: "Success posting an article!" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal server error: creating article" });
	}
}

export async function get_articles(req: Request, res: Response) {
	try {
		const articles = await db.select().from(article);
		return res.status(200).json(articles);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal server error: getting articles" });
	}
}

export async function get_articles_by_id(req: Request, res: Response) {
	try {
		const { articleId } = req.params;
		const [articles] = await db
			.select()
			.from(article)
			.where(eq(article.id, +articleId));

		return res.status(200).json({ articles });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal server error: getting article" });
	}
}

export async function update_article(req: Request, res: Response) {
	try {
		const { articleId } = req.params;
		const { title, tags, content } = req.body;

		await db
			.update(article)
			.set({ title, tags, content, created_at: new Date(Date.now()) })
			.where(eq(article.id, parseInt(articleId, 10)));
		return res.status(200).json({ message: "Success updating articles" });
	} catch (error: any) {
		console.log(error.message);
		return res
			.status(500)
			.json({ message: "Internal server error: updating article" });
	}
}

export async function delete_article(req: Request, res: Response) {
	try {
		const { articleId } = req.params;
		await db.delete(article).where(eq(article.id, +articleId));
		return res.status(200).json({ message: "Success deleting article!" });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Internal server error: deleting article" });
	}
}
