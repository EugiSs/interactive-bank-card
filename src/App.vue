<template>
	<div class="app__wrapper">
		<main class="main">
			<CardItem></CardItem>
		</main>
		<FooterBlock></FooterBlock>
	</div>
</template>

<script>
import FooterBlock from "./components/FooterBlock.vue";
import CardItem from "./components/CardItem.vue";

export default {
	name: "App",
	components: { FooterBlock, CardItem }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap");
@import "./assets/scss/index.scss";

.app {
	height: 100vh;
	background-image: url("@/assets/img/bg-main-desktop.png");
	background-repeat: no-repeat;
	background-size: auto 100%;
	background-position: top left;
	&__wrapper {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 0 10px;
	}

	@media (max-width: 768px) {
		background-image: url("@/assets/img/bg-main-mobile.png");
		background-size: 100% 240px;
		background-position: top left;

		&__wrapper {
			padding: 0 15px;
		}
	}
}

.main {
	flex: 1 1 auto;
	display: flex;
	align-items: center;
	justify-content: center;

	.card {
		width: 100%;
		max-width: 1140px;
	}
	@media (max-width: 768px) {
		align-items: flex-start;
		.card {
			margin-top: 30px;
		}
	}
}
</style>
