const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const button = document.querySelector("button");
const selectSpans = document.querySelectorAll(".main-input>span");
const euroURL = "http://data.fixer.io/api/latest?access_key=0caeb14640e95ee28aa87ed5ff61e470";

const getData = async (url, valuteIn = "EUR", valuteOut = "RUB") => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (valuteOut === "RUB" && valuteIn === "USD") {
			let oneValute = data.rates.RUB / data.rates.USD;
			convert(oneValute);
		} else if (valuteOut === "RUB" && valuteIn === "EUR") {
			convert(data.rates.RUB);
		} else if (valuteOut === "EUR" && valuteIn === "RUB") {
			let oneValute = 1 / data.rates.RUB;
			convert(oneValute);
		} else if (valuteOut === "USD" && valuteIn === "RUB") {
			let oneValute = 1 / (data.rates.RUB / data.rates.USD);
			convert(oneValute);
		} else if (valuteIn === "EUR" && valuteOut === "USD") {
			convert(data.rates.USD);
		} else if (valuteIn === "USD" && valuteOut === "EUR") {
			let oneValute = 1 / data.rates.USD;
			convert(oneValute);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const convert = (oneValuteValue) => {
	inputs[1].value = inputs[0].value * oneValuteValue;
};

const clearInputs = (inputsArray) => {
	inputsArray.forEach((elem) => {
		elem.value = "";
	});
};

const init = () => {
	inputs.forEach((elem) => {
		elem.disabled = true;
	});
	selects.forEach((elem) => {
		elem.addEventListener("change", (e) => {
			if (e.target.classList.contains("select-in")) {
				inputs[0].disabled = false;
				selectSpans[0].textContent = e.target[e.target.selectedIndex].value;
				clearInputs(inputs);
			} else if (e.target.classList.contains("select-out")) {
				selectSpans[1].textContent = e.target[e.target.selectedIndex].value;
				clearInputs(inputs);
			}
		});
	});

	try {
		if (button) {
			button.addEventListener("click", (e) => {
				if (inputs[0].value !== "" && selects[0].value !== "" && selects[0].value !== "") {
					getData(euroURL, selects[0].value, selects[1].value);
				} else {
					throw Error("Пустое поле для ввода либо не выбрана валюта");
				}
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

init();