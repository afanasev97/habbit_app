'use strict';
var log = console.log;

let habbits = [];
let globalActiveHabbitId;
const HABBIT_KEY = "HABBIT_KEY";

/* page */
const page = {
	menu: document.querySelector(".menu__list"),
	header: {
		h1: document.querySelector(".h1"),
		progressPercent: document.querySelector(".progress__percent"),
		progressCoverBar: document.querySelector(".progress__cover_bar")
	},
	content: {
		daysContainer: document.getElementById("days"),
		nextDay: document.querySelector(".habbit__day")
	},
	popup: {
		index: document.getElementById("add-habbit-popup"),
		iconField: document.querySelector(".popup__form input[name='icon']")
	}
}

/* utils */

function loadData() {
	const habbitString = localStorage.getItem(HABBIT_KEY);
	const habbitArray = JSON.parse(habbitString);
	if (Array.isArray(habbitArray)) {
		habbits = habbitArray;
	}
}

function saveData() {
	localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */

function renderMenu(activeHabbit) {
	for (const habbit of habbits) {
		const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`)
		if (!existed) {
			const element = document.createElement("button");
			element.setAttribute("menu-habbit-id", habbit.id);
			element.classList.add("menu__item");
			element.addEventListener("click", () => rerender(habbit.id));
			element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt="${habbit.name}" />`;
			if (activeHabbit.id === habbit.id) {
				element.classList.add("menu__item_active");
			}
			page.menu.appendChild(element);
			continue;
		}
		if (activeHabbit.id === habbit.id) {
			existed.classList.add("menu__item_active");
		} else {
			existed.classList.remove("menu__item_active");
		}
	}
}

function renderHead(activeHabbit) {
	page.header.h1.innerText = activeHabbit.name;
	const progress = activeHabbit.days.length / activeHabbit.target > 1
		? 100
		: activeHabbit.days.length / activeHabbit.target * 100;
	page.header.progressPercent.innerText = `${progress.toFixed(0)}%`;
	page.header.progressCoverBar.setAttribute("style", `width: ${progress.toFixed(0)}%`)
}

function rerenderContent(activeHabbit) {
	page.content.daysContainer.innerHTML = "";
	for (const index in activeHabbit.days) {
		const element = document.createElement("div");
		element.classList.add("habbit");
		element.innerHTML = `<div class="habbit__day">День ${Number(index) + 1}</div>
			<div class="habbbit__comment">${activeHabbit.days[index].comment}</div>
			<button class="habbit__delete" onclick="deleteDays(${Number(index)})">
				<img src="./images/delete.svg" alt="delete day ${Number(index) + 1}">
			</button>`
		page.content.daysContainer.appendChild(element)
	}
	page.content.nextDay.innerHTML = `День ${activeHabbit.days.length + 1}`;
}



function rerender(activeHabbitId) {
	globalActiveHabbitId = activeHabbitId;
	const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
	if (!activeHabbit) return;
	document.location.replace(document.location.pathname + `#${activeHabbitId}`);
	renderMenu(activeHabbit);
	renderHead(activeHabbit);
	rerenderContent(activeHabbit);
}

/* work with days */
function addDays(event) {
	const form = event.target;
	event.preventDefault();
	const data = new FormData(form);
	const comment = data.get("comment");
	form["comment"].classList.remove('error');
	if (!comment) {
		form["comment"].classList.add('error');
		return;
	}
	habbits = habbits.map(habbit => {
		if (habbit.id === globalActiveHabbitId) {
			return {
				...habbit,
				days: habbit.days.concat([{ comment }])
			}
		}
		return habbit;
	});
	form["comment"].value = "";
	rerender(globalActiveHabbitId);
	saveData();
}

function deleteDays(dayIndex) {
	habbits = habbits.map(habbit => {
		if (habbit.id === globalActiveHabbitId) {
			return {
				...habbit,
				days: habbit.days.toSpliced(dayIndex, 1)
			}
		}
		return habbit;
	});
	rerender(globalActiveHabbitId);
	saveData();
}

/* popup functions */

function togglePopUp() {
	page.popup.index.classList.toggle("cover_hidden");
}

function setIcon(context, icon) {
	page.popup.iconField.value = icon;
	const activeIcon = document.querySelector(".icon.icon_active");
	activeIcon.classList.remove("icon_active");
	context.classList.add("icon_active");
}

function addHabbit(event) {
	const form = event.target;
	event.preventDefault();
	const data = new FormData(form);
	const name = data.get("name");
	const target = data.get("target");
	const icon = data.get("icon");
	if (!icon) return;
	if (validateForm(form, name, target)) return;
	habbits = habbits.concat([{
		id: habbits.length + 1,
		name,
		target: Number(target),
		icon,
		days: []
	}]);
	saveData();
	rerender(habbits[habbits.length - 1].id);
	togglePopUp();
	clearPopupForm();
}

function validateForm(form, name, target) {
	let wrongForm = false;
	if (!name) {
		form["name"].classList.add("error");
		wrongForm = true;
	}
	if (!target || target < 1) {
		form["target"].classList.add("error");
		wrongForm = true;
	}
	if (!wrongForm) {
		form["name"].classList.remove("error");
		form["target"].classList.remove("error");
	}
	return wrongForm;
}

function clearPopupForm() {
	page.popup.index.querySelector("form").reset();
}

/* init */
(() => {
	loadData();
	const hashId = Number(document.location.hash.replace("#", ""));
	const urlHabbit = habbits.find(habbit => habbit.id === hashId);
	if (urlHabbit) {
		rerender(urlHabbit.id);
	} else {
		if (habbits.length === 0) {
			togglePopUp();
		} else {
			rerender(habbits[0].id);
		}
	}
})();

