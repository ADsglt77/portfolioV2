interface TimelineItem {
	date: string;
	organization: string;
	role?: string;
	description?: string;
	type: "formation" | "work";
}

export const timelineData: TimelineItem[] = [
	{
		date: "2020/2021",
		organization: "Lycée Turgot (Limoges)",
		role: "Seconde (option SI-CIT)",
		description: "Baccalauréat général",
		type: "formation",
	},
	{
		date: "Mars 2020",
		organization: "Police Nationale",
		role: "Stage de trois jours",
		type: "work",
	},
	{
		date: "2021/2022",
		organization: "Lycée Turgot (Limoges)",
		role: "Première (Maths/NSI/Physique-Chimie)",
		description: "Baccalauréat général",
		type: "formation",
	},
	{
		date: "Juin 2021",
		organization: "Flexocolor",
		role: "Stage d'une semaine",
		description:
			"Photogravure, découverte métier + journée avec gestionnaire informatique + responsable site web",
		type: "work",
	},
	{
		date: "2022/2023",
		organization: "Lycée Turgot (Limoges)",
		role: "Terminale (Maths/NSI)",
		description: "Baccalauréat général obtenu",
		type: "formation",
	},
	{
		date: "2023/2024",
		organization: "Lycée Valadon (Limoges)",
		role: "BTS SIO (Services Informatiques aux Organisations) - 1ère année",
		description: 'Option "Certification"',
		type: "formation",
	},
	{
		date: "Mai/Juin 2024",
		organization: "Broussaud Textile",
		role: "Stage de cinq semaines",
		description:
			"Symfony/PHP, migration API REST vers GraphQL, découverte rôle dev en entreprise",
		type: "work",
	},
	{
		date: "Depuis Mai 2024",
		organization: "Super U (Aixe-Sur-Vienne / Limoges)",
		role: "Job étudiant (Grande surface)",
		type: "work",
	},
	{
		date: "2024/2025",
		organization: "Lycée Valadon (Limoges)",
		role: "BTS SIO (Services Informatiques aux Organisations) - 2ème année",
		description: "Major de promotion",
		type: "formation",
	},
	{
		date: "Janvier/Février 2025",
		organization: "Condat Basket Club",
		role: "Stage de sept semaines",
		description: "Site vitrine + dashboard, NuxtJS/Vue/TypeScript/Prisma",
		type: "work",
	},
	{
		date: "2025/2026",
		organization: "Beaupeyrat (Limoges)",
		role: "Bachelor C.D.W.M. (Concepteur Développeur Web et Mobile)",
		type: "formation",
	},
	{
		date: "Depuis Septembre 2025",
		organization: "Therasoft",
		role: "Alternant - Développeur full-stack",
		description: "Alternance en parallèle du Bachelor C.D.W.M.",
		type: "work",
	},
];
