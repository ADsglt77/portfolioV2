import { Elysia } from "elysia";
import { contactBody, contactResponse } from "./model";
import { contactService } from "./service";

export const contactController = new Elysia({ prefix: "/contact" }).post(
	"/",
	({ body }) => contactService.send(body),
	{
		body: contactBody,
		response: contactResponse,
	},
);
