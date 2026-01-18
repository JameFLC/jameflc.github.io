<script>
	import Profile from '$lib/components/cv/Profile.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import ContactList from '$lib/components/cv/ContactList.svelte';
	import ExperienceTimeline from '$lib/components/cv/ExperienceTimeline.svelte';
	import SkillBadge from '$lib/components/cv/SkillBadge.svelte';
	import { websiteURL } from '$lib';
	import { page } from '$app/state';
	import IconLinkThin from '$lib/components/icons/IconLinkThin.svelte';
	import Contribution from '$lib/components/cv/Contribution.svelte';
</script>

<svelte:head>
	<title>Resume Jame FLC</title>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="CV" />
	<meta property="og:description" content="Jame Floc'h Le Carour personal Website" />
	<meta property="og:image" content={websiteURL + '/images/thumbnails/Home.webp'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={websiteURL} />
	<meta property="twitter:url" content={websiteURL + page.url.pathname} />
	<meta name="twitter:title" content="CV" />
	<meta name="twitter:description" content="Jame Floc'h Le Carour personal Website" />
	<meta name="twitter:image" content={websiteURL + '/images/thumbnails/Home.webp'} />
</svelte:head>

<section>
	<SectionTitle>Profile</SectionTitle>

	<Profile>
		I am <span class="text-black">Jame</span>, a
		<span class="text-semi-bold">software engineer</span>
		game developer and 3D enjoyer based in France. I find joy in building things that can be played,
		displayed, rotated and clicked, it makes my brain tick. I take pride in making quality software that
		feel good to use being games, apps or tools.
		<br />
		<br />
		I have an extensive knowledge in
		<span class="text-bold">technical art, shaders, 3D modeling, and real-time 3D rendering.</span>
	</Profile>

	<div class="x-centerer">
		<a
			class="strong-page-link"
			href="/documents/cv/en/CV Jame Floc'h Le Carour - Software Engineer.pdf"
			download
		>
			<span>Download Resume</span>
			<IconLinkThin style="--size: 1ch" />
		</a>
	</div>
</section>
<section>
	<SectionTitle>Contact Informations</SectionTitle>

	<ContactList />
</section>
<section>
	<SectionTitle>Contributions</SectionTitle>
	<div class="auto-grid" style="gap: var(--rl);">
		<Contribution
			src="/images/games/Splitgate2.webp"
			name="Splitgate: Arena Reloaded  "/>
		<Contribution
			src="/images/games/OblivionRemastered.webp"
			name="Oblivion Remastered"/>
		<Contribution
			src="/images/games/Marvel1943RiseOfHydra.webp"
			name="Marvel 1943 Rise Of Hydra"/>
		<Contribution
			src="/images/games/NDA.webp"
			name="Unanounced (x2)"/>
	</div>
</section>
<section>
	<SectionTitle>Professional Experience</SectionTitle>

	<ExperienceTimeline
		experiences={[
			{
				Place: 'Virtuos Games',
				Role: 'Generalist Game Software Engineer ',
				Description: [
					'Developed menus and 3D gizmos with Unreal Engine 5 in the game Splitgate 2. Implemented cross-platform interfaces for controllers ensuring certification on Xbox and PS5.',
					'Developed a performance benchmark plugin for Unreal Engine integrated into Marvel 1943: Rise of Hydra and The Elder Scrolls Oblivion Remaster. Created the plugin and 3D and 2D tools. Managed data visualization. Project presented at GDC.',
					'Developed an internal QT application for managing assets across the Virtuos group in collaboration with the R&D teams in Singapore. Created the asset upload system. The application made it possible to gather and globalize more than 150 terabytes of data.',
					"Updated the WPF interfaces of a proprietary game engine. Created an application for the engine's widget gallery. Added a new dark/light theme to all engine applications. Updated the Avalon Doc library.",
					'Updated Btree memory allocators to replace RedBlackTree in a proprietary C++ engine for an AAA game.'
				],
				Begin: new Date('2022-10'),
				End: 'Now'
			},
			{
				Place: 'Black Shamrock',
				Role: 'Intern Game Tooling Engineer',
				Description: [
					'Creation of an automation system, metadata linking, configurations, and 3D assets for a procedural generation system in Unreal Engine 4. The system eliminated these manual tasks.',
					'Creation of a procedural generation debug plugin that reduced iteration time by a factor of 10.'
				],
				Begin: new Date('2024-06'),
				End: new Date('2024-08')
			},
			{
				Place: 'Lapsco Laboratory',
				Role: 'VR Developper',
				Description: [
					'Creation of a VR fire simulator for behavioral studies in hazardous environments, with a focus on fire safety.',
					'As the project lead, I was responsible for VR programming, gameplay programming, interfaces and subsystems, as well as testing methods.'
				],
				Begin: new Date('2022-04'),
				End: new Date('2024-07')
			},
			{
				Place: "Coop'art",
				Role: 'Hologram Developper',
				Description: [
					'Responsible for creating a real-time holographic projection system on Unity, graphics programming, and tools.',
					'Developed real-time motion capture support for Xsens suits.',
					'Developed software control via an external physical interface using the Art-Net protocol.'
				],
				Begin: new Date('2024-06'),
				End: new Date('2024-08')
			}
		]}
	/>
</section>
<section>
	<SectionTitle>Education</SectionTitle>

	<ExperienceTimeline
		experiences={[
			{
				Role: 'Master Degree in Software Engineering for Multimedia',
				Description:
					'Studied general aspects of regular engeneering as well as computer science, videogame productcion, multimedia tools and tech and electronics ',
				Begin: new Date('2022-09'),
				End: 'Now'
			},
			{
				Role: 'BTEC Higher National Diploma in computer science and digital imagery',
				Description:
					'Studied general aspcects of computer science with a specialisation in digital imagery, multimedia and videogame production ',
				Begin: new Date('2020-09'),
				End: new Date('2022-07')
			}
		]}
	/>
</section>
<section>
	<SectionTitle>Programming</SectionTitle>

	<h3>Languages</h3>
	<br />
	<SkillBadge name="C++" src="/images/skills/CPP.webp" />
	<SkillBadge name="C#" src="/images/skills/CSharp.webp" />
	<SkillBadge name="Python" src="/images/skills/Python.webp" />
	<SkillBadge name="HSLS / GLSL" src="/images/skills/Shader.webp" />
	<SkillBadge name="TypeScript / JS" src="/images/skills/TS.webp" />

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
