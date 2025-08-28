<script>
	import StrongPageLink from '$lib/components/StrongPageLink.svelte';
	import Profile from '$lib/components/cv/Profile.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import ContactList from '$lib/components/cv/ContactList.svelte';
	import ExperienceTimeline from '$lib/components/cv/ExperienceTimeline.svelte';
	import SkillBadge from '$lib/components/cv/SkillBadge.svelte';
</script>

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
		I have an extensive knowledge of light transport technologies for realtime applications.
	</Profile>

	<StrongPageLink href="/cv">Get Resume PDF</StrongPageLink>
</section>
<section>
	<SectionTitle>Contact Informations</SectionTitle>

	<ContactList />
</section>
<section>
	<SectionTitle>Professional Experience</SectionTitle>

	<ExperienceTimeline
		experiences={[
			{
				Place: 'Virtuos Games',
				Role: 'Generalist Game Software Engineer ',
				Description:
					'I worked on the creation of a suite of new tools to improve their testing workflows, I worked on both the UI and backend of this solution. I also worked on the complete visual refresh of their engine tools, I participated in the creation of our workflows documents and made tools to test our new visuals upgrades',
				Begin: new Date('2022-10'),
				End: 'Now'
			},
			{
				Place: 'Black Shamrock',
				Role: 'Intern Game Tooling Engineer',
				Description:
					'I worked on different pipeline and asset management tools for an Unreal Engine AAA production in which I used a lot of the engine subsystems to automate some tedious tasks and improved QA team workflows',
				Begin: new Date('2024-06'),
				End: new Date('2024-08')
			},
			{
				Place: 'Lapsco Laboratory',
				Role: 'VR Developper',
				Description:
					'Developed a VR simulator with the aim of studying the behavior of people during an emergency. evacuation. I was in charge the programming of the gameplay, VR, UI and systems. I also did the asset creation, level design and testing.',
				Begin: new Date('2022-04'),
				End: new Date('2024-07')
			},
			{
				Place: "Coop'art",
				Role: 'Hologram Developper',
				Description: [
					'Developed a real time holographic projection system for live shows. Integrated Xsens motion capture API to animate virtual characters with people movements.',
					'Added DMX support to control the projection parameters with physical controllers. Created a Unity plugin to export prefabs directly into the running simulation.'
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

	<h3>Frameworks</h3>
	<br />
	<SkillBadge name="Unreal Engine" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Unity Engine" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Godot Engine" src="/images/skills/SkillPlaceholder.webp" />

	<SkillBadge name="WPF" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Blazor" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="UWP/WinUI 3" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="QT" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="IMGUI" src="/images/skills/SkillPlaceholder.webp" />

	<h3>Languages</h3>
	<br />
	<SkillBadge name="C#" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="C++" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Python" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="GLSL" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="HLSL" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Cuda" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="TypeScript / JS" src="/images/skills/SkillPlaceholder.webp" />
</section>
<section>
	<SectionTitle>Dev Tools</SectionTitle>
	<SkillBadge name="Git" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Perforce P4V" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Jetbrains Rider" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Visual Studio" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Visual Studio Code" src="/images/skills/SkillPlaceholder.webp" />
</section>
<section>
	<SectionTitle>Art and Design Tools</SectionTitle>\
	<SkillBadge name="Blender" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Affinity Designer" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Affinity Photo" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Photoshop" src="/images/skills/SkillPlaceholder.webp" />
	<SkillBadge name="Davinci Resolve" src="/images/skills/SkillPlaceholder.webp" />
</section>
