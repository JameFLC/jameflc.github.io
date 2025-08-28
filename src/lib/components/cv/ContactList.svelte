<div class="contact-list-wrapper">
	<div class="contact-wrapper">
		<p class="type text-medium">Email</p>
		<p>
			<a href="mailto:jameflc.contact@gmail.com">jameflc.contact@gmail.com</a>
		</p>
	</div>
	<div class="contact-wrapper">
		<p class="type text-medium">Linkedin</p>
		<p>
			<a href="https://linkedin.com/in/jameflc">linkedin.com/in/jameflc</a>
		</p>
	</div>
	<div class="contact-wrapper">
		<p class="type text-medium">Instagram</p>
		<p>
			<a href="https://instagram.com/jame_flc">instagram.com/jame_flc</a>
		</p>
	</div>
	<div class="contact-wrapper">
		<p class="type text-medium">GitHub</p>
		<p>
			<a href="https://github.com/JameFLC">github.com/JameFLC</a>
		</p>
	</div>
</div>

<style>
	.contact-list-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--rms);
	}

	.contact-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.contact-wrapper > * {
		font-size: var(--tl);

		display: block;
		margin: 0px;
		padding: 0px;
	}

	.type {
		min-width: 15ch;
	}

	a {
		color: var(--text-secondary);
		min-width: 25ch;
	}
</style>
