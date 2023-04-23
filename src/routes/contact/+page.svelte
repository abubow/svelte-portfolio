<script>
	import emailjs from '@emailjs/browser';

	let mailSentSuccess = false;
	let mailSentError = false;

	let sending = false;
	function sendEmail(e) {
		e.preventDefault();
		mailSentSuccess = false;
		mailSentError = false;
		sending = emailjs
			.sendForm('portfolio_mail_app', 'template_gje2hvm', e.target, 'PovoLKFhNtZDG0vy1')
			.then(
				(result) => {
					console.log(result.text);
					mailSentSuccess = true;
				},
				(error) => {
					console.log(error.text);
					mailSentError = true;
				}
			);
	}

	$: if (mailSentSuccess) {
		setTimeout(() => {
			mailSentSuccess = false;
		}, 5000);
	}

	$: if (mailSentError) {
		setTimeout(() => {
			mailSentError = false;
		}, 5000);
	}
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
	></script>
	<script type="text/javascript">
		(function () {
			emailjs.init('user_2ZQ2Q2ZQ2Q2ZQ2ZQ2ZQ2Z');
		})();
	</script>
</svelte:head>
<h1 class="text-4xl font-bold my-16">Contact</h1>
{#if mailSentSuccess}
	<div class="alert alert-success">
		<slot name="success">Your message has been sent!</slot>
	</div>
{/if}
{#if mailSentError}
	<div class="alert alert-error">
		<slot name="error">There was an error sending your message.</slot>
	</div>
{/if}
<form class="flex flex-col space-y-8 mb-60" on:submit|preventDefault={sendEmail}>
	<div class="form-control w-full">
		<label class="label" for="from_name">
			<span class="label-text">What is your name?</span>
		</label>
		<input
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xl"
			id="from_name"
			name="from_name"
		/>
	</div>

	<div class="form-control w-full">
		<label for="email">
			<span class="label-text">What is your email?</span>
		</label>
		<input
			type="text"
			id="email"
			name="email"
			placeholder="Your email.."
			class="input input-bordered w-full max-w-xl"
		/>
	</div>

	<div class="form-control w-full">
		<label for="message">
			<span class="label-text">What is your message?</span>
		</label>
		<textarea
			id="message"
			name="message"
			placeholder="Your message.."
			class="textarea textarea-bordered w-full max-w-xl"
		/>
	</div>

	<input class="btn btn-primary max-w-xl" type="submit" value="Submit" />
</form>
