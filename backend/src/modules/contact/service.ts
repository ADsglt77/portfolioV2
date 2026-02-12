import type { ContactBody } from "./model";

async function send(data: ContactBody) {
	// TODO: Intégrer un service d'envoi d'email (Resend, Nodemailer, etc.)
	console.log("📧 Nouveau message de contact :", {
		from: `${data.name} <${data.email}>`,
		subject: data.subject,
		message: data.message,
	});

	return {
		success: true,
		message: "Message envoyé avec succès",
	};
}

export const contactService = { send };
