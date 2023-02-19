<template>
	<div class="card">
		<div class="card__wrapper">
			<div class="card__body">
				<div class="card__previews">
					<div class="card__preview card__preview_front">
						<img
							src="@/assets/img/bg-card-front.png"
							alt="card-img"
							class="card__img"
						/>
						<div class="card__text">
							<p class="card__number">{{ number }}</p>
							<p class="card__bottom">
								<span class="card__name">{{ name }}</span>
								<span class="card__date">{{ dateMonth }}/{{ dateYear }}</span>
							</p>
						</div>
					</div>
					<div class="card__preview card__preview_back">
						<img
							src="@/assets/img/bg-card-back.png"
							alt="card-img"
							class="card__img"
						/>
						<div class="card__text">
							<span class="card__cvc">{{ cvc }}</span>
						</div>
					</div>
				</div>
				<div class="card__info">
					<transition name="fade" mode="out-in">
						<CardForm
							class="card__form"
							v-if="!added"
							@confirm="onConfirm"
						></CardForm>
						<CardNotification v-else class="card__notify" @showForm="showForm"></CardNotification>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardForm from "./CardForm.vue";
import CardNotification from "./CardNotification.vue";
import { ref } from "vue";

export default {
	components: { CardForm, CardNotification },
	setup() {
		let added = ref("");
		let name = ref("Jane Appleseed");
		let number = ref("0000 0000 0000 0000");
		let dateMonth = ref("00");
		let dateYear = ref("00");
		let cvc = ref("000");

		const onConfirm = (data) => {
			name.value = data.name;
			number.value = data.cardNumber;
			dateMonth.value = data.dateMonth;
			dateYear.value = data.dateYear;
			cvc.value = data.cvc;

			added.value = true;
		};

    // после отправки формы - клик на "Continue" открывает окно с пустой формой
    const showForm = (data) => {
      added.value = data;

      name.value = "Jane Appleseed";
      number.value = "0000 0000 0000 0000";
			dateMonth.value = "00";
			dateYear.value = "00";
			cvc.value = "000";
    }

		return { added, onConfirm, name, number, dateMonth, dateYear, cvc, showForm };
	}
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.card {
	&__wrapper {
	}

	&__body {
		display: flex;
		align-items: center;
		gap: 125px;
		@media (max-width: 1100px) {
			justify-content: space-between;
			gap: 80px;
		}
	}

	&__previews {
		flex: 0 1 calc(540 / 1050 * 100%);
		max-width: 540px;
		display: flex;
		flex-direction: column;
		gap: 34px;
	}

	&__preview {
		max-width: 447px;
		position: relative;

		&_front {
			&::after {
				content: "";
				position: absolute;
				width: 100%;
				max-width: 84px;
				height: 100%;
				max-height: 50px;
				left: 25px;
				top: 25px;
				background: url("@/assets/img/card-logo.svg");
				background-repeat: no-repeat;
				background-size: 100%;
			}

			.card__text {
				bottom: 20px;
				left: 50%;
				transform: translateX(-50%);
				width: calc(100% - 40px);
			}
		}

		&_back {
			align-self: flex-end;
			text-align: right;
			box-shadow: 0px 0px 30px -15px hsl(279deg 6% 55%);

			.card__text {
				top: 50%;
				right: 50px;
				transform: translateY(-50%);
			}
		}
	}

	&__img {
		width: 100%;
		object-fit: cover;
		vertical-align: middle;
	}

	&__text {
		position: absolute;
		color: $White;
	}

	&__number {
		@include adaptiv-value("font-size", 30, 20, 1);
		letter-spacing: 2px;
		@include adaptiv-value("margin-bottom", 22, 1, 1);
	}

	&__bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
	}

	&__name {
		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	&__date {
	}

	&__cvc {
		font-size: 18px;
		letter-spacing: 1px;
	}

	&__info {
		max-width: 384px;
		flex: 0 1 calc(384 / 1050 * 100%);
	}

	@media (max-width: 768px) {
		&__body {
			flex-direction: column;
			@include adaptiv-value("gap", 150, 45, 1);
			gap: 0;
		}
		&__previews {
			flex: 0 1 100%;
			width: 100%;
			max-width: none;
			min-height: 254px;
			gap: 0;
			position: relative;
		}
		&__preview {
			width: calc(287 / 375 * 100%);
			min-width: 286px;
			height: auto;
			min-height: 156px;
			position: absolute;

			&_front {
				z-index: 2;
				left: 0;
				top: 35%;
			}
			&_back {
				top: 0;
				right: 0;
			}
		}
		&__info {
			width: 100%;
		}
	}

	@media (max-width: 500px) {
		&__preview {
			&_front {
				&::after {
					max-width: 55px;
					max-height: 32px;
				}
			}
			&_back {
				.card__text {
					top: 48%;
					right: 40px;
				}
			}
		}

		&__number {
			font-size: 18px;
			margin-bottom: 10px;
		}

		&__bottom {
			font-size: 14px;
		}
		&__cvc {
			font-size: 14px;
		}

		&__info {
			max-width: 330px;
		}
	}
}

// анимация отображения элемента
.fade-enter-active,
.fade-leave-active {
	transition: all 1s ease;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>
