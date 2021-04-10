const app = document.getElementById("myApp");

class Links {
	inputEl = app.querySelector(".controls__input");
	buttonEl = app.querySelector(".controls__button");
	todosListEl = app.querySelector(".links__list");

	_createLinkElement = (linkValue) => {
		const linkElement = document.createElement("li");
		
		linkElement.setAttribute("class", "links__item");
		linkElement.innerHTML = `
			<a href = '${linkValue}'>${linkValue}</a>
			<button class = 'links__remove'>remove</button>
		`;
		return linkElement;
	};

	_addLinkHandler = () => {
		const linkValue = this.inputEl.value;
		const newLinkElem = this._createLinkElement(linkValue);

		this.todosListEl.appendChild(newLinkElem);
	};

	addButtonListener = () => {
		this.buttonEl.addEventListener("click", this._addLinkHandler);
	};
}

const toDo = new Links();

toDo.addButtonListener();
