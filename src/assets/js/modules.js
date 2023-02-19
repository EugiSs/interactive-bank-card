export function checkCardholderName(card, value, errorsList) {
	switch (true) {
		case !value:
			card.errors.push("name");
			card.nameErr = errorsList.empty;
			break;
		case /\d/.test(value):
			card.errors.push("name");
			card.nameErr = errorsList.invalidText;
			break;
		default:
			break;
	}
}

export function checkCardNumber(card, value, errorsList) {
	switch (true) {
		case !value:
			card.errors.push("cardNumber");
			card.cardNumberErr = errorsList.empty;
			break;
		case value.length > 0 && value.length < 16:
			card.errors.push("cardNumber");
			card.cardNumberErr = errorsList.invalidCardNum;
			break;
		default:
			break;
	}
}

export function checkCardDate(card, valueMonth, valueYear, errorsList) {
	let currentYear = +String(new Date().getFullYear()).slice(2);
	let currentMonth = new Date().getMonth() + 1;

	switch (true) {
		case !valueMonth:
			card.errors.push("date", "dateMonth");
			card.dateErr = errorsList.empty;
			break;
		case valueMonth == 0:
		case valueMonth > 12:
			card.errors.push("date", "dateMonth");
			card.dateErr = errorsList.invalidDate;
			break;
		case /\D/.test(valueMonth):
			card.errors.push("date", "dateMonth");
			card.dateErr = errorsList.invalidNumber;
			break;
		default:
			break;
	}

	switch (true) {
		case !valueYear:
			card.errors.push("date", "dateYear");
			card.dateErr = errorsList.empty;
			break;
		case valueYear < currentYear:
			card.errors.push("date", "dateYear");
			card.dateErr = errorsList.expiredDate;
			break;
		case /\D/.test(valueYear):
			card.errors.push("date", "dateYear");
			card.dateErr = errorsList.invalidNumber;
			break;
		default:
			break;
	}

	if (valueYear == currentYear && valueMonth <= currentMonth) {
		card.errors.push("date", "dateMonth");
		card.dateErr = errorsList.expiredDate;
	}
}

export function chechCardCvc(card, value, errorsList) {
	switch (true) {
		case !value:
			card.errors.push("cvc");
			card.cvcErr = errorsList.empty;
			break;
		case String(value).length !== 3:
			card.errors.push("cvc");
			card.cvcErr = errorsList.invalidCvcNum;
			break;
		default:
			break;
	}
}
