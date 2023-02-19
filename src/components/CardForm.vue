<template>
	<form action="#" class="card-form">
		<div class="card-form__body">
			<div class="card-form__fields">
				<div
					class="card-form__field form-field"
					:class="{ error: card.errors.includes('name') }"
				>
					<label for="name" class="form-field__label">Cardholder Name</label>
					<input
						id="name"
						type="text"
						class="form-field__input _input-name"
						:class="{ error: card.errors.includes('name') }"
						placeholder="e.g. Jane Appleseed"
						v-model="card.name"
					/>
					<p class="form-field__note-invalid">{{ card.nameErr }}</p>
				</div>
				<div
					class="card-form__field form-field"
					:class="{ error: card.errors.includes('cardNumber') }"
				>
					<label for="cardNumber" class="form-field__label">Card Number</label>
					<input
						id="cardNumber"
						maxlength="19"
						class="form-field__input _input-card-number"
						:class="{ error: card.errors.includes('cardNumber') }"
						placeholder="e.g. 1234 5678 9123 0000"
						v-model="card.cardNumber"
						@input="onInputCardNumber"
					/>
					<p class="form-field__note-invalid">{{ card.cardNumberErr }}</p>
				</div>
				<div
					class="card-form__field form-field"
					:class="{ error: card.errors.includes('date') }"
				>
					<label for="dateMonth" class="form-field__label"
						>Exp. Date (MM/YY)</label
					>
					<input
						id="dateMonth"
						maxlength="2"
						class="form-field__input _input-month"
						:class="{ error: card.errors.includes('dateMonth') }"
						placeholder="MM"
						v-model="card.dateMonth"
						@change="card.dateMonth = checkDateLength($event.target.value)"
					/>
					<input
						maxlength="2"
						class="form-field__input _input-year"
						:class="{ error: card.errors.includes('dateYear') }"
						placeholder="YY"
						v-model="card.dateYear"
						@change="card.dateYear = checkDateLength($event.target.value)"
					/>
					<p class="form-field__note-invalid">{{ card.dateErr }}</p>
				</div>
				<div
					class="card-form__field form-field"
					:class="{ error: card.errors.includes('cvc') }"
				>
					<label for="cvc" class="form-field__label">CVC</label>
					<input
						id="cvc"
						maxlength="3"
						class="form-field__input _input-cvc"
						:class="{ error: card.errors.includes('cvc') }"
						placeholder="e.g. 123"
						v-model="card.cvc"
					/>
					<p class="form-field__note-invalid">{{ card.cvcErr }}</p>
				</div>
			</div>
			<button
				type="submit"
				class="card-form__button btn"
				@click.prevent="confirm"
			>
				Confirm
			</button>
		</div>
	</form>
</template>

<script>
import { onMounted, ref } from "vue";
import {
	checkCardholderName,
	checkCardNumber,
	checkCardDate,
	chechCardCvc
} from "../assets/js/modules.js";

export default {
	props: {},

	setup(props, context) {
		let errors = {
			empty: "Can`t be blank",
			invalidText: "Wrong format, letters only",
			invalidNumber: "Wrong format, numbers only",
			invalidCardNum: "Must contain 16 digits",
			invalidDate: "Wrong date",
			expiredDate: "Card expired",
			invalidCvcNum: "Must contain 3 digits"
		};
		let card = ref(null);
		card.value = {
			name: "",
			nameErr: "",
			cardNumber: "",
			cardNumberErr: "",
			dateMonth: "",
			dateYear: "",
			dateErr: "",
			cvc: "",
			cvcErr: "",
			errors: []
		};

		// автофокус первого инпута при загрузке страницы
		onMounted(() => {
			document.querySelector("input").focus();
		});

		// добавление пробела после 4х цифр номера карты
		const onInputCardNumber = (e) => {
			var vcc = e.target.value.replace(/\D/g, "");
			e.target.value = "";
			for (var i = 0; i < vcc.length; i++) {
				e.target.value += (i % 4 == 0 && i != 0 ? " " : "") + vcc[i];
			}
		};

		// добавление 0 к дате, состоящей из 1 цифры
		const checkDateLength = (value) => {
			if (value > 0 && value < 10 && value.length == 1) {
				value = "0" + value;
			}
			return value;
		};

		const confirm = () => {
			card.value.errors = [];

			// проверка имени
			checkCardholderName(card.value, card.value.name, errors);

			// проверка номера карты
			checkCardNumber(card.value, card.value.cardNumber, errors);

			// проверка даты
			checkCardDate(
				card.value,
				card.value.dateMonth,
				card.value.dateYear,
				errors
			);

			// проверка cvc
			chechCardCvc(card.value, card.value.cvc, errors);

			// запрет отправки формы при хоть одной ошибке
			if (card.value.errors.length > 0) {
				return;
			}

			context.emit("confirm", card.value);
		};

		return { card, errors, onInputCardNumber, confirm, checkDateLength };
	}
};
</script>

<style lang="scss">
@import "../assets/scss/index.scss";

.card-form {
	&__body {
	}

	&__fields {
		@include adaptiv-value("margin-bottom", 40, 10, 1);
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 25px 20px;
	}

	&__field {
		width: 100%;
	}

	&__button {
	}

	@media (max-width: 768px) {
		&__fields {
			gap: 20px;
		}
	}
	@media (max-width: 500px) {
		&__fields {
			margin-bottom: 25px;
		}
	}
}

.form-field {
	&.error {
		& input {
			// border: 1px solid $Red;
		}
		.form-field__note-invalid {
			display: block;
			font-size: 13px;
			color: red;
			margin-top: 8px;
		}
	}

	&:nth-child(3) {
		max-width: 170px;
	}
	&:nth-child(4) {
		max-width: 190px;
	}
	&__label {
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: $VeryDarkViolet;
		margin-bottom: 10px;
	}

	&__input {
		width: 100%;
		max-height: 45px;
		display: inline-block;
		border: 1px solid $LightGrayishViolet;
		border-radius: 8px;
		padding: 13px 14px;
		&.error {
			border: 1px solid $Red;
		}

		&::placeholder {
			font-size: 18px;
			color: $LightGrayishViolet;
		}

		&:focus {
			outline: none;
			border: 0.3px solid hsl(278, 94%, 30%);
		}

		&._input-month,
		&._input-year {
			max-width: 80px;
		}
		&._input-month {
			margin-right: 10px;
		}
		&._input-cvc {
			max-width: 190px;
		}
	}

	&__note-invalid {
		display: none;
	}

	@media (max-width: 768px) {
		&:nth-child(3) {
			max-width: 150px;
		}
		&:nth-child(4) {
			max-width: 160px;
		}
		&__label {
		}
		&__input {
			&._input-month,
			&._input-year {
				max-width: 70px;
			}
			&._input-month {
				margin-right: 5px;
			}
		}
	}

	@media (max-width: 500px) {
		&__input {
			&::placeholder {
				font-size: 16px;
			}
			&._input-month,
			&._input-year {
				max-width: 72px;
			}
			&._input-cvc {
				max-width: 162px;
			}
		}
	}
}

._input-name {
}

._input-card-number {
}

._input-month {
}

._input-year {
}

._input-cvc {
}
</style>
