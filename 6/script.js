const currentDate = new Date().toISOString().slice(0, 10);
const myApp = document.getElementById("app");
const BASE_URL = "https://api.exchangeratesapi.io/";

let currency = "RUB";
let daysMode = false;

const daysOTW = [
	"Воскресенье",
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
];

const baseStructure = () => {
	const buttonList = document.createElement("div");
	const controls = document.createElement("div");
	const currencies = document.createElement("table");
	const tableHead = document.createElement("tr");
	const tableBody = document.createElement("tbody");

	buttonList.setAttribute("class", "button-list");
	currencies.setAttribute("class", "currencies");
	controls.setAttribute("class", "controls");

	tableHead.innerHTML = `
		<th>Валюта</th>
		<th>Курс</th>`;
	currencies.appendChild(tableHead);
	currencies.appendChild(tableBody);

	myApp.appendChild(buttonList);
	myApp.appendChild(controls);
	myApp.appendChild(currencies);
};

const renderControls = () => {
	const controls = document.querySelector(".controls");
	const changeMode = createButton(
		"Дни недели",
		controls,
		"button button_controls"
	);
	const changeCurrency = createButton(
		"Поменять валюту",
		controls,
		"button button_controls"
	);

	changeCurrency.addEventListener("click", onCurrencyChangeClickHandler);
	changeMode.addEventListener("click", onChangeModeClickHandler);

	const currentCurrency = document.createElement("div");
	currentCurrency.setAttribute("class", "controls__current");
	currentCurrency.innerHTML = `Текущая валюта - ${currency}`;

	controls.appendChild(currentCurrency);
};

const createButton = (content, parent, className) => {
	const button = document.createElement("button");

	button.setAttribute("class", className);

	if (content instanceof Date) {
		button.setAttribute(
			"data-default-date",
			content.toISOString().slice(0, 10)
		);
		button.setAttribute("data-alternative-date", content.getDay());
		button.textContent = button.dataset.defaultDate;
		button.addEventListener("click", onDateClickHandler);
	} else {
		button.textContent = content;
	}

	parent.appendChild(button);
	return button;
};

const generateDates = (num) => {
	const dates = [];

	for (let i = 0; i < num; i++) {
		const date = new Date();
		date.setDate(date.getDate() - i);
		dates.push(date);
	}
	return dates;
};

const renderButtons = (array) => {
	const parent = document.querySelector(".button-list");
	array.forEach((item) => {
		createButton(item, parent, "button");
	});
};

const fetchData = (date = currentDate) => {
	const url = `${BASE_URL}${date}?base=${currency}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			renderCurrency(data.rates);
		});
};

const renderCurrency = (rates) => {
	const tableBody = document.querySelector(".currencies tbody");

	tableBody.innerHTML = Object.keys(rates)
		.map((item) => {
			if (item === currency) return;
			return `<tr>
			<td>${item}</td>
			<td>${rates[item]}
		</tr>`;
		})
		.join(" ");
};

const onDateClickHandler = (event) => {
	const date = event.target.dataset.defaultDate;
	fetchData(date);
};

const onCurrencyChangeClickHandler = () => {
	if (currency === "RUB") currency = "USD";
	else currency = "RUB";

	document.querySelector(
		".controls__current"
	).innerHTML = `Текущая валюта - ${currency}`;
	fetchData();
};

const onChangeModeClickHandler = () => {
	const buttons = document.querySelectorAll(".button-list .button");
	if (!daysMode) {
		buttons.forEach((item, index) => {
			if (index == 0) {
				item.textContent = "Сегодня";
				return;
			}
			if (index == 1) {
				item.textContent = "Вчера";
				return;
			}

			item.textContent = daysOTW[+item.dataset.alternativeDate];
		});
	} else {
		buttons.forEach((item) => {
			item.textContent = item.dataset.defaultDate;
		});
	}

	daysMode = !daysMode;
};

baseStructure();
renderControls();

const date = generateDates(7);
renderButtons(date);
fetchData();
