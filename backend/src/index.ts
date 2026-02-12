import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { contactController } from "./modules/contact";

const app = new Elysia().use(cors()).use(contactController).listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
