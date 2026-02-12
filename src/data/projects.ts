import bibliothequePoster from "../assets/projects/poster/bibliotheque.jpg";
import condatPoster from "../assets/projects/poster/condat.jpg";
import jardinierPoster from "../assets/projects/poster/jardinier.jpg";
import restoPoster from "../assets/projects/poster/resto.jpg";
import bibliothequeVideo from "../assets/projects/videos/bibliotheque.mp4";
import jardinierVideo from "../assets/projects/videos/jardinier.mp4";
import {
	iconAndroid,
	iconCloudflare,
	iconCss,
	iconDart,
	iconDocker,
	iconFlutter,
	iconMysql,
	iconNuxt,
	iconPhp,
	iconPrisma,
	iconSymfony,
	iconTypeScript,
	iconVue,
} from "./icons";

export interface Technology {
	icon: string;
	label: string;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: Technology[];
	links: {
		readmePdf?: string;
		website?: string;
		github?: string;
	};
	video: {
		src?: string;
		poster?: string;
	};
}

const techIconMap: Record<string, Technology> = {
	nuxt: { icon: iconNuxt, label: "NuxtJS" },
	vue: { icon: iconVue, label: "VueJS" },
	ts: { icon: iconTypeScript, label: "TypeScript" },
	prisma: { icon: iconPrisma, label: "Prisma" },
	css: { icon: iconCss, label: "CSS" },
	cloudflare: { icon: iconCloudflare, label: "Cloudflare" },
	docker: { icon: iconDocker, label: "Docker" },
	dart: { icon: iconDart, label: "Dart" },
	flutter: { icon: iconFlutter, label: "Flutter" },
	android: { icon: iconAndroid, label: "Android" },
	php: { icon: iconPhp, label: "PHP" },
	symfony: { icon: iconSymfony, label: "Symfony" },
	mysql: { icon: iconMysql, label: "MySQL" },
};

function mapTechnologies(techI: string[]): Technology[] {
	return techI
		.map((tech) => techIconMap[tech.toLowerCase()])
		.filter((tech): tech is Technology => tech !== undefined);
}

export const projects: Project[] = [
	{
		id: "condat",
		title: "Projet Basket Club",
		description:
			"Ce projet consiste à créer un site vitrine pour le Club de Basket de Condat. Il mettra en avant les valeurs du club, ses licenciés et ses produits. Avec ce site vitrine un Dashboard sera développé pour les gérants du club, il permettra la mise à jour du site facilement et rapidement. Pour cela j'utiliserai le Framework NuxtJS",
		technologies: mapTechnologies([
			"nuxt",
			"vue",
			"ts",
			"prisma",
			"css",
			"cloudflare",
			"docker",
		]),
		links: {
			website: "https://condatbasketclub.com/",
			github: "https://github.com/Condat-Basket-Club",
		},
		video: {
			src: undefined,
			poster: condatPoster,
		},
	},
	{
		id: "bibliotheque",
		title: "PROJET Bibliotheque",
		description:
			"Ce projet consiste à créer une application mobile pour une bibliothèque pouvant gérer des livres, des auteurs et des utilisateurs et les lier. Il a été développé en utilisant Android Studio avec Flutter et Dart pour répondre à la demande de la bibliothèque.",
		technologies: mapTechnologies(["dart", "flutter", "android"]),
		links: {
			github: "https://github.com/ADsglt77/bibliotheque",
		},
		video: {
			src: bibliothequeVideo,
			poster: bibliothequePoster,
		},
	},
	{
		id: "jardinier",
		title: "PROJET Jardinier",
		description:
			"Cet atelier professionnel a pour but de réaliser une application web, à l'aide du Framework PHP Symfony. Cette application reprend le contexte d'un site de jardinerie, qui doit permettre de pourvoir créer des devis avec un ou plusieurs taillages de haies dans le même devis.",
		technologies: mapTechnologies(["php", "symfony", "css"]),
		links: {
			github: "https://github.com/ADsglt77/jardinierV2",
		},
		video: {
			src: jardinierVideo,
			poster: jardinierPoster,
		},
	},
	{
		id: "resto",
		title: "PROJET Resto",
		description:
			"Ce projet consiste à créer un site web pour un restaurant où l'on peut se connecter, liker des restaurants, mettre des commentaires et rechercher les restaurants selon certains critères.",
		technologies: mapTechnologies(["php", "mysql", "css"]),
		links: {
			github: "https://github.com/ADsglt77/r3st0",
		},
		video: {
			src: undefined,
			poster: restoPoster,
		},
	},
];
