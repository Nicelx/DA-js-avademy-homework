const BASE_URL = "https://jsonplaceholder.typicode.com";
const COMMENTS_ENDPOINT = "comments";
const USERS_ENDPOINT = "users";

const state = {
	// initialData : 'Пусто',
	users: null,
	posts: null,
	postLimit: 20,
};

const compose = (...fns) => (initial) =>
	fns.reduceRight((state, fn) => fn(state), initial);

const curry2 = (fn) => (x) => (y) => fn(x, y);
const curry3 = (fn) => (x) => (y) => (z) => fn(x, y, z);

const isExist = (thing) => (thing ? true : false);

const createParams = (paramObj) => new URLSearchParams(paramObj);
const makeUrl = (baseUrl, endpoint, params) =>
	`${baseUrl}/${endpoint}?${createParams(params)}`;

const toJson = (res) => res.json();

const placeholderUrl = curry3(makeUrl)(BASE_URL);

const commentsUrl = placeholderUrl(COMMENTS_ENDPOINT);
const usersUrl = placeholderUrl(USERS_ENDPOINT);

const listItemString = ({ name, email, body, username }) => `
	<li class = 'list__item'>
		<div>
			<div>
				${username}
			</div>
			<div>
				${name}
			</div>
			<div>
				${email}
			</div>
			<div>
				${body}
			</div>
		</div>
	</li>
`;

const loadData = async (state, postsUrl, userUrl) => {
	const postResponse = await fetch(postsUrl);
	const usersResponse = await fetch(userUrl);

	state.posts = await toJson(postResponse);
	state.users = await toJson(usersResponse);
	// dataFromRequest = await response.json();
	console.log(state);
	renderList(list, state);
};

const addUserToPost = (posts, users) => {
	const combinedPosts = posts.map((post) => {
		const user = users.find((user) => user.id === post.postId);

		return {
			...post,
			username: user.username,
		};
	});
	return combinedPosts;
};

const list = document.querySelector(".list");

const renderList = (list, state) => {
	const { posts, users } = state;

	const listString = addUserToPost(posts, users)
		.map(listItemString)
		.join(" ");

	list.innerHTML = `${listString}`;
};

loadData(state, commentsUrl({ _limit: state.postLimit }), usersUrl());

// fetch(commentsUrl()).then(toJson).then(data => console.log(data)).catch(err => )

// compose(hello1, hello2)();

// const getData = ()=> {
// 	fetch(BASE_URL, {postId = 1}).then(response => response.json()).then(data => console.log(data))
// }
