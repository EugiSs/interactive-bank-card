<template>
	<div class="card-notify">
		<div class="card-notify__img">
			<img src="@/assets/img/icon-complete.svg" alt="complete" />
		</div>
		<h1 class="card-notify__title">Thank you!</h1>
		<p class="card-notify__text">We've added your card details</p>
		<button class="card-notify__button btn" @click="showForm">Continue</button>
	</div>
</template>

<script>
export default {
	props: { added: Boolean },

	setup(props, context) {
    // сркыть окно уведомления об отправке и снова показать форму
		const showForm = () => {
			context.emit("showForm", false);
		};

		return { showForm };
	}
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.card-notify {
	text-align: center;

	&__img {
		margin-bottom: 40px;
	}

	&__title {
		font-size: 30px;
		text-transform: uppercase;
		letter-spacing: 3px;
		margin-bottom: 24px;
	}

	&__text {
		font-size: 18px;
		color: $DarkGrayishViolet;
		margin-bottom: 50px;
	}

	&__button {
	}
}
</style>
