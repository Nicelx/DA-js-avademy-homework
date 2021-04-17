const app = document.getElementById("myApp");

const TABLE_BODY_SELECTOR = ".track-info__table-body";
const TABLE_SELECTOR = '.track-info__table';
const CONTROLS_INPUT_SELECTOR = ".controls__input";
const CONTROLS_BUTTON_SELECTOR = ".controls__button";
const LINKS_LIST_SELECTOR = ".links__list";
const TRACK_IMG_SELECTOR = '.track__img'
const TRACK_INFO_SELECTOR = '#toggler'

const ON_TRACK_INFO = "onTrackInfos";
const TRACKED_ATTR = "data-tracked";
const LINKS_ITEM = "links__item";
const LINKS_REMOVE = "links__remove";
const TABLE_BODY_HIDDEN = "track-info__table--hidden";

class Links {
	constructor () {
		this.addListeners();
	}
	inputEl = app.querySelector(CONTROLS_INPUT_SELECTOR);
	buttonEl = app.querySelector(CONTROLS_BUTTON_SELECTOR);
	todosListEl = app.querySelector(LINKS_LIST_SELECTOR);

	_createLinkItem = (linkValue) => {
		const linkItem = document.createElement("li");

		linkItem.innerHTML = `
			<a href = '${linkValue}' target = '_blank'>${linkValue}</a>
			<button class = 'links__remove'>Remove</button>
		`;
		linkItem.setAttribute("class", LINKS_ITEM);

		return linkItem;
	};
	_simpleURLvalidation = str => {
		const reg = /^(http:\/\/.|https:\/\/.|www\.).+$/ 

		if (reg.test(str)) return true
		else {
			alert('url invalid')
			return false}
	}

	_addLinkByEnter = (e) => {
		if (e.key === "Enter") this._addLinkHandler();
	};
	_addLinkHandler = () => {
		const linkValue = this.inputEl.value;
		if (!this._simpleURLvalidation(linkValue)) return
		
		const newLinkElem = this._createLinkItem(linkValue);

		this.todosListEl.appendChild(newLinkElem);
		this.inputEl.value = "";
	};
	_removeLinkHandler = (e) => {
		if (e.target.className !== LINKS_REMOVE) return;
		e.target.parentNode.remove();
	};

	addListeners = () => {
		this.buttonEl.addEventListener("click", this._addLinkHandler);
		this.inputEl.addEventListener("keyup", this._addLinkByEnter);
		document.addEventListener("click", this._removeLinkHandler);
	};
}

class Tracker {
	constructor(
		{ elements, isTrackButtons, isTrackLinks } = {
			elements: [],
			isTrackButtons: true,
			isTrackLinks: true,
		}
	) {
		if (elements) this.elements = this._addTrackedToElements(elements);

		this.isTrackButtons = isTrackButtons;
		this.isTrackLinks = isTrackLinks;
		this._createTagArrayFromConfig();
	}

	_trackInfos = [];
	_tags = []

	_createTagArrayFromConfig = () => {
		const {isTrackButtons, isTrackLinks, _tags} = this
		if (isTrackButtons) _tags.push("button");
		if (isTrackLinks) _tags.push("a");
	}

	_setTracked = (item) => item.setAttribute(TRACKED_ATTR, true);
	_addTrackedToElements = (elements) => elements.map(this._setTracked);

	_pathToString = (path) =>
		path
			.reduce((acc, item) => {
				const { localName, className } = item;

				if (localName) return `${localName}.${className} -> ${acc}`;
				else return `${acc}`;
			}, "")
			.replace(/\.\s/g, " ")
			.slice(0, -3);

	_createTrackInfo = (e) => {
		const { id, innerText, className, localName } = e.target;
		const date = new Date().toLocaleString();

		return {
			elementId: id || "no id in element",
			tagName: localName,
			content: innerText || "no inner text in element",
			className: className || "no classNames in element",
			time: date,
			eventPath: this._pathToString(e.composedPath()),
		};
	};

	_addTrackInfo = (e) => {
		const info = this._createTrackInfo(e);
		this._trackInfos.push(info);
		app.dispatchEvent(tracksChanged);
	};

	_trackListener = (e) => {
		const { _tags } = this;
		const { localName, dataset } = e.target;

		if (_tags.includes(localName) || dataset.tracked) {
			this._addTrackInfo(e);
			return;
		}
		return;
	};

	getStats = () => this._trackInfos;

	addListeners = () => {
		document.addEventListener("click", this._trackListener);
	};
	removeListeners = () => {
		document.removeEventListener("click", this._trackListener);
	};
}

class InfoRepresentation {
	constructor(trackInfo) {
		this.trackInfo = trackInfo || [];

		this.addInfoReprListener();
	}

	listEl = app.querySelector(TABLE_BODY_SELECTOR);
	toggler = app.querySelector(TRACK_INFO_SELECTOR)
	table = app.querySelector(TABLE_SELECTOR)

	_createSingleLiString = (item) => {
		const { elementId, tagName, content, className, time, eventPath } = item;
		return `
			<tr>
				<td>${elementId}</td>
				<td>${tagName}</td>
				<td>${content}</td>
				<td>${className}</td>
				<td>${time}</td>
				<td>${eventPath}</td>
			</tr>
			`;
	};

	_toggleInfo = () => this.table.classList.toggle(TABLE_BODY_HIDDEN)

	_createTableString = () => this.trackInfo.map(this._createSingleLiString).join(" ");

	_render = (tableString) => (this.listEl.innerHTML = tableString);
	
	_onTrackInfosHanlder = () => this._render(this._createTableString());

	addInfoReprListener = () => {
		app.addEventListener(ON_TRACK_INFO, this._onTrackInfosHanlder);
		toggler.addEventListener('click', this._toggleInfo)
	};
}

const tracksChanged = new CustomEvent(ON_TRACK_INFO);

const links = new Links();

const kittyImg = app.querySelector(TRACK_IMG_SELECTOR)
const trackConfig = {
	elements: [kittyImg],
	isTrackButtons: true,
	isTrackLinks: true,
}

const tracker = new Tracker(trackConfig);
tracker.addListeners();
const infoRepresentation = new InfoRepresentation(tracker.getStats());

