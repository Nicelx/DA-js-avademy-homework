const BASE_URL = "https://jsonplaceholder.typicode.com";
const COMMENTS_ENDPOINT = "comments";
const USERS_ENDPOINT = "users";
const NAME_FILTER_PROP = "nameFilter";
const EMAIL_FILTER_PROP = "emailFilter";

const state = {
	users: null,
	posts: null,
	emailFilter: "",
	nameFilter: "",
	filteredPosts: [],
	postLimit: 40,
};

const compose = (...fns) => (initial) => fns.reduceRight((state, fn) => fn(state), initial);

const curry3 = (fn) => (x) => (y) => (z) => fn(x, y, z);

const isResponseOk = (response) => {
	const { ok, url, status } = response;

	if (ok) return response;

	alert(`fetch to ${url} return status ${status}`);
	return false;
};

const toJson = (res) => res.json();
const handleResponse = compose(toJson, isResponseOk);

const createParams = (paramObj) => new URLSearchParams(paramObj);

const makeUrl = (baseUrl, endpoint, params) => `${baseUrl}/${endpoint}?${createParams(params)}`;
const placeholderUrl = curry3(makeUrl)(BASE_URL);
const commentsUrl = placeholderUrl(COMMENTS_ENDPOINT);
const usersUrl = placeholderUrl(USERS_ENDPOINT);

const isEmailInclude = (emailSubstring) => (item) => item.email.includes(emailSubstring);
const isNameInclude = (nameSubstring) => (item) => item.username.includes(nameSubstring);

const toListString = (arr) => arr.map(listItemString).join(" ");

const listItemString = ({ name, email, body, username }) => `
	<li class = 'list__item'>
		<div class = 'list__user'>
			${username} : ${email}
		</div>
		<div class = 'list__title'>
			<strong>title:</strong> ${name}
		</div>
		<div class = 'list__post'>
			${body}
		</div>
	</li>
`;
const nothingFoundInList = () => `
	<li class = 'list__nothing'>
		<p>no one post was found</p>
	</li>
`;

const loadData = async (state, postsUrl, userUrl) => {
	try {
		toggleSpinner(spinner);
		const postResponse = await fetch(postsUrl);
		const usersResponse = await fetch(userUrl);

		state.posts = await handleResponse(postResponse);
		state.users = await handleResponse(usersResponse);

		renderList(list, state);
	} catch (err) {
		console.log(err);
	} finally {
		toggleSpinner(spinner);
	}
};

const addUserToPost = (posts, users) => {
	const combinedPosts = posts.map((post) => {
		const user = users.find((user) => user.id === post.postId);
		return {
			...post,
			username: user ? user.username : `Anonym ${post.postId}`,
		};
	});
	return combinedPosts;
};

const renderList = (list, state) => {
	const { posts, users, emailFilter, nameFilter } = state;
	state.filteredPosts = addUserToPost(posts, users);

	if (emailFilter || nameFilter) {
		if (emailFilter) {
			state.filteredPosts = state.filteredPosts.filter(isEmailInclude(emailFilter));
		}
		if (nameFilter) {
			state.filteredPosts = state.filteredPosts.filter(isNameInclude(nameFilter));
		}
	}
	if (state.filteredPosts.length === 0) {
		list.innerHTML = `${nothingFoundInList()}`;
		return;
	}
	list.innerHTML = `${toListString(state.filteredPosts)}`;
};

const toggleSpinner = (spinner) => spinner.classList.toggle("spinner--active");

const myApp = document.getElementById("myApp");
const list = myApp.querySelector(".list");
const spinner = myApp.querySelector(".spinner");
const numberInput = myApp.querySelector("#number");
const emailInput = myApp.querySelector("#email");
const nameInput = myApp.querySelector("#name");
const loadButton = myApp.querySelector("#load");

const onChange = (prop) => (state, list) => (e) => {
	state[prop] = e.target.value;
	renderList(list, state);
};
const onEmailFilter = onChange(EMAIL_FILTER_PROP);
const onNameFilter = onChange(NAME_FILTER_PROP);

const onLimitHandler = (state) => () => {
	state.postLimit = numberInput.value;
	loadData(state, commentsUrl({ _limit: state.postLimit }), usersUrl());
};

emailInput.addEventListener("change", onEmailFilter(state, list));
nameInput.addEventListener("change", onNameFilter(state, list));
loadButton.addEventListener("click", onLimitHandler(state));

// initial load
loadData(state, commentsUrl({ _limit: state.postLimit }), usersUrl());
