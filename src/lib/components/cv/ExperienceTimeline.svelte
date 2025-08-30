<script lang="ts" module>
	export type Experience = {
		Place?: string;
		Role: string;
		Description: string | string[];
		Begin: Date;
		End: Date | 'Now';
	};
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { getLangString, isEnglishUrl } from '$lib/langage';

	let {
		experiences
	}: {
		experiences: Experience[];
	} = $props();

	function getFormatedPlace(experience: Experience): string {
		return experience.Place ? `${experience.Place} - ` : '';
	}

	function getFormatedDuration(experience: Experience): string {
		const formatedBegin = `${getFormatedMonth(experience.Begin)} ${experience.Begin.getFullYear()}`;
		const formatedEnd =
			experience.End === 'Now'
				? getLangString(page.url.pathname, "Aujourd'hui", 'Currently')
				: `${getFormatedMonth(experience.End)} ${experience.End.getFullYear()}`;

		return `${formatedBegin} - ${formatedEnd}`;
	}

	function getFormatedMonth(date: Date): string {
		const months = [
			['Jan', 'Jan'],
			['Fév', 'Feb'],
			['Mar', 'Mar'],
			['Avr', 'Apr'],
			['Mai', 'May'],
			['Juin', 'Jun'],
			['Jui', 'Jul'],
			['Août', 'Aug'],
			['Sep', 'Sep'],
			['Oct', 'Oct'],
			['Nov', 'Nov'],
			['Dec', 'Dec']
		];

		return months[date.getMonth()][+isEnglishUrl(page.url.pathname)];
	}
</script>

<div class="clean-list experience-list-wrapper">
	{#each experiences as experience}
		<li class="experience-wrapper">
			<div class="timeline-wrapper">
				<div class="timeline-point"></div>
				<div class="timeline-line"></div>
			</div>
			<div class="info-wrapper">
				<p class="no-wrap date">{getFormatedDuration(experience)}</p>
				<div class="experience">
					<p class="context text-semi-bold text-semi-bold">
						<span class="no-wrap text-black">{getFormatedPlace(experience)}</span>
						<span class={experience.Place ? 'no-wrap' : ''}>{experience.Role}</span>
					</p>
					{#if Array.isArray(experience.Description)}
						{#each experience.Description as paragraph}
							<p class="description text-book">{paragraph}</p>
						{/each}
					{:else}
						<p class="description text-book">{experience.Description}</p>
					{/if}
				</div>
			</div>
		</li>
	{/each}
</div>

<style>
	.experience-list-wrapper {
		--gap: var(--rxl);
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		margin-top: var(--rxxl);
	}

	.experience-wrapper {
		display: flex;
	}

	.timeline-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-right: var(--rm);
	}

	.timeline-point {
		height: var(--rms);
		width: var(--rms);
		margin-top: var(--rs);
		border-radius: 1000px;
		outline: var(--rxs) solid var(--layer-3);
		aspect-ratio: 1;

		transition: background-color var(--dm) var(--ease-out-circle);
	}

	.experience-wrapper:hover .timeline-point {
		background-color: var(--layer-5);
	}

	.timeline-line {
		width: var(--rxs);
		border-radius: 1000px;
		background-color: var(--layer-3);
		height: calc(100% + var(--gap) - var(--rs));
		margin-bottom: calc(-1 * var(--gap) - var(--rs));
	}

	li:last-child .timeline-line {
		height: 100%;
		margin-bottom: 0px;
		background: linear-gradient(180deg, var(--layer-3) 50%, transparent 100%);
	}

	.info-wrapper {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.date {
		color: var(--text-secondary);
		flex: 0 0 auto;
		min-width: 20ch;
		margin-top: 0;
		margin-bottom: var(--rs);
	}

	.experience {
		flex: 1 1 0;
		min-width: 30ch;
	}

	.experience p:last-of-type {
		margin-bottom: 0;
	}

	.context {
		margin-top: 0;
		margin-bottom: 0;
	}

	.description {
		max-width: calc(100vw - var(--rxl));
	}
</style>
