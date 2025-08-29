<script>
	import StrongPageLink from '$lib/components/StrongPageLink.svelte';
	import Profile from '$lib/components/cv/Profile.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import ContactList from '$lib/components/cv/ContactList.svelte';
	import ExperienceTimeline from '$lib/components/cv/ExperienceTimeline.svelte';
	import SkillBadge from '$lib/components/cv/SkillBadge.svelte';
	import { websiteURL } from '$lib';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>CV Jame FLC</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="CV" />
	<meta property="og:description" content="Site personnel de Jame Floc'h Le Carour" />
	<meta property="og:image" content={websiteURL + '/images/thumbnails/Home.webp'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={websiteURL} />
	<meta property="twitter:url" content={websiteURL + page.url.pathname} />
	<meta name="twitter:title" content="CV" />
	<meta name="twitter:description" content="Site personnel de Jame Floc'h Le Carour" />
	<meta name="twitter:image" content={websiteURL + '/images/thumbnails/Home.webp'} />
</svelte:head>

<section>
	<SectionTitle>Profile</SectionTitle>

	<Profile>
		Je suis <span class="text-black">Jame</span>, un
		<span class="text-semi-bold">Ingénieur Informatique</span>, game developer et créateur 3D basé
		en France. Je créer des choses qui peuvent être affichées, manipulées, jouées ou cliquées. Je me
		consacre à créer des logiciels de qualité et agréables à utiliser, qu'il s'agisse de jeux,
		d'applications ou d'outils.
		<br />
		<br />
		J'ai également des connaissances avancées en
		<span class="text-bold">
			technical art, en shaders, en modélisation 3D et en rendu 3D temps réel.</span
		>
	</Profile>

	<!-- <StrongPageLink href="/cv">Get Resume PDF</StrongPageLink> -->
</section>
<section>
	<SectionTitle>Contact Informations</SectionTitle>

	<ContactList />
</section>
<section>
	<SectionTitle>Expérience Pro</SectionTitle>

	<ExperienceTimeline
		experiences={[
			{
				Place: 'Virtuos Games',
				Role: 'Generalist Game Software Engineer ',
				Description: [
					"Développé des menus et d'outils de manipulation 3D avec Unreal Engine 5 dans le jeu Splitgate 2. Mise en place d'interfaces multiplateformes pour les manettes assurant les certifications sur consoles de jeu.",
					'Développé un plugin de benchmark de performance pour Unreal Engine intégré dans Marvel 1943: Rise of Hydra et Oblivion Remaster. Création du plugin, et des outils 3D et 2D. Gestion de la visualisation des données. Projet présenté à la GDC. ',
					"Développé une application QT interne de gestion d'Assets à l'échelle du groupe monde Virtuos en collaboration avec les équipes de R&D de Singapour. Création du système d'upload d'Assets. L'application a permis de réunir et globaliser plus de 150 tera de données.",
					"Mise en place d'allocateurs mémoire de Btree pour remplacer les RedBlackTree dans un moteur propriétaire en C++ pour un jeu AAA."
				],
				Begin: new Date('2022-10'),
				End: 'Now'
			},
			{
				Place: 'Black Shamrock',
				Role: 'Intern Game Tooling Engineer',
				Description: [
					"Création d'un système d'automatisation, de liaison de metadata, de configurations et d'Assets 3D pour un système de génération procédurale dans Unreal Engine 4. Le système a permis de supprimer ces tâches manuelles.",
					"Création d'un plugin de debug de génération procédural permettant une division du temps d'itération par 10."
				],
				Begin: new Date('2024-06'),
				End: new Date('2024-08')
			},
			{
				Place: 'Lapsco Laboratory',
				Role: 'VR Developper',
				Description: [
					"Création d'un simulateur d'incendie en VR pour l'étude comportementale dans les milieux dangereux.",
					"En charge du projet, j'ai réalisé la programmation VR, celle du gameplay, les interfaces et sous systèmes ainsi que les méthodes de test."
				],
				Begin: new Date('2022-04'),
				End: new Date('2022-07')
			},
			{
				Place: "Coop'art",
				Role: 'Hologram Developper',
				Description: [
					"En charge de la création d'un système de projection holographique en temps réel sur Unity, programmation graphique et d'outils.",
					'Ajout du support de motion capture en temps réel pour les combinaisons Xsens.',
					'Ajout du contrôle du logiciel via une interface physique externe via le protocole Art-Net.'
				],
				Begin: new Date('2021-11'),
				End: new Date('2022-03')
			}
		]}
	/>
</section>
<section>
	<SectionTitle>Education</SectionTitle>

	<ExperienceTimeline
		experiences={[
			{
				Place: "Diplôme d'Ingénieur Informatique et Multimédia",
				Role: 'Le Cnam Enjmin, Angoulême, France ',
				Description:
					"J'ai étudié les aspects généraux de l'ingénierie ainsi que l'informatique graphique, la production de jeux vidéo, les outils multimédias et l'électronique.",
				Begin: new Date('2022-09'),
				End: 'Now'
			},
			{
				Place: 'DUT Informatique spécialisé dans le Multimédia et la 3D',
				Role: 'IUT Clermont Auvergne, Le Puy-en-Velay, France',
				Description:
					"J'ai étudié les aspects généraux de l'informatique avec une spécialisation en imagerie numérique, multimédia et production de jeux vidéo.",
				Begin: new Date('2020-09'),
				End: new Date('2022-07')
			}
		]}
	/>
</section>
<section>
	<SectionTitle>Programming</SectionTitle>

	<h3>Engines</h3>
	<br />
	<SkillBadge name="Unreal Engine" src="/images/skills/Unreal.webp" />
	<SkillBadge name="Unity Engine" src="/images/skills/Unity.webp" />
	<SkillBadge name="Godot Engine" src="/images/skills/Godot.webp" />
	<SkillBadge name="Custom Engines" src="/images/skills/SkillPlaceholder.webp" />

	<h3>UI Frameworks</h3>
	<SkillBadge name="WinUI / WPF" src="/images/skills/WinUI.webp" />
	<SkillBadge name="QT" src="/images/skills/QT.webp" />
	<SkillBadge name="Svelte" src="/images/skills/Svelte.webp" />
	<SkillBadge name="IMGUI" src="/images/skills/SkillPlaceholder.webp" />

	<h3>Languages</h3>
	<br />
	<SkillBadge name="C++" src="/images/skills/CPP.webp" />
	<SkillBadge name="C#" src="/images/skills/CSharp.webp" />
	<SkillBadge name="Python" src="/images/skills/Python.webp" />
	<SkillBadge name="HSLS / GLSL" src="/images/skills/Shader.webp" />
	<SkillBadge name="TypeScript / JS" src="/images/skills/TS.webp" />
</section>
<section>
	<SectionTitle>Dev Tools</SectionTitle>
	<SkillBadge name="Git" src="/images/skills/Git.webp" />
	<SkillBadge name="Perforce P4V" src="/images/skills/P4V.webp" />
	<SkillBadge name="Jetbrains Rider" src="/images/skills/Rider.webp" />
	<SkillBadge name="Visual Studio" src="/images/skills/VisualStudio.webp" />
	<SkillBadge name="Visual Studio Code" src="/images/skills/VisualStudioCode.webp" />
</section>
<section>
	<SectionTitle>Art and Design Tools</SectionTitle>
	<SkillBadge name="Blender" src="/images/skills/Blender.webp" />
	<SkillBadge name="Affinity Designer" src="/images/skills/AffinityDesigner.webp" />
	<SkillBadge name="Affinity Photo" src="/images/skills/AffinityPhoto.webp" />
	<SkillBadge name="Photoshop" src="/images/skills/Photoshop.webp" />
	<SkillBadge name="Davinci Resolve" src="/images/skills/DavinciResolve.webp" />
</section>

<br />
<br />
<br />
<br />
<br />
<br />
