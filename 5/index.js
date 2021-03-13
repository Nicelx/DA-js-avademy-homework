const movieList = [
	{
		movie: "The Irishman",
		genre: "drama",
		price: 210,
	},
	{
		movie: "Gentlemen",
		genre: "criminal",
		price: 235,
	},
	{
		movie: "Joker",
		genre: "thriller",
		price: 210,
	},
	{
		movie: "Knives Out",
		genre: "detective",
		price: 200,
	},
	{
		movie: "Once Upon a Time... in Hollywood",
		genre: "drama",
		price: 230,
	},
	{
		movie: "Ford v Ferrari",
		genre: "biography",
		price: 245,
	},
	{
		movie: "Spider-Man: Far from Home",
		genre: "fantasy",
		price: 220,
	},
	{
		movie: "Gisaengchung",
		genre: "thriller",
		price: 225,
	},
	{
		movie: "Tenet",
		genre: "fantasy",
		price: 240,
	},
	{
		movie: "Palm Springs",
		genre: "comedy",
		price: 215,
	},
];

// for in
const simpleValidation = (data) => {
	for (key in data) {
		const movieObj = data[key];
		const { movie, genre, price } = movieObj;

		if (!(movie && genre && price)) {
			console.log("movie list isn't correct");
			return false;
		}
		if (
			typeof movie != "string" ||
			typeof genre != "string" ||
			movie == "" ||
			genre == ""
		) {
			console.log("movie and genre are required");
			return false;
		}
		if (price < 0 || price > 9999) {
			console.log(`price ${price} is invalid`);
			return false;
		}
	}
	return true;
};

// fun declaration + do while
function lowestPrice(data) {
	let i = 1,
		minPrice = data[0].price,
		movie = data[0];
	do {
		if (minPrice > data[i].price) {
			minPrice = data[i].price;
			movie = data[i];
		}
		i++;
	} while (i < data.length - 1);

	console.log(
		`movie with lowest price: ${movie.price} is '${movie.movie}' in genre: ${movie.genre}`
	);
}

// fun expression + while
const higherPrice = function (data) {
	let i = 0,
		maxPrice = data[0].price,
		movie = data[0];

	while (i < data.length) {
		if (maxPrice < data[i].price) {
			maxPrice = data[i].price;
			movie = data[i];
		}
		i++;
	}

	console.log(
		`movie with higher price: ${movie.price} is '${movie.movie}' in genre: ${movie.genre}`
	);
};

// arrow fun + for
const averagePrice = (data) => {
	for (let i = 0, total = 0; i < data.length; i++) {
		total += data[i].price;
		if (i == data.length - 1) {
			console.log(`average price is ${total / (i + 1)}`);
			return total / (i + 1);
		}
	}
};

// for of
const closestToAverage = (data) => {
	let average = averagePrice(data);
	let diffValue = Math.abs(data[0].price - average);
	let currentClosest = data[0];

	for (movie of data) {
		if (diffValue > Math.abs(movie.price - average)) {
			diffValue = Math.abs(movie.price - average);
			currentClosest = movie;
		}
	}

	console.log(
		`closest movie to that average price is ${currentClosest.movie} with price equal to ${currentClosest.price}`
	);
};

// iife
(() => {
	if (!simpleValidation(movieList)) return;
	closestToAverage(movieList);
	lowestPrice(movieList);
	higherPrice(movieList);
})();


/* optional just wanted to try it)))
*
*
*
*/
function* priceUp(data) {
	if (!simpleValidation(movieList)) return;
	const copy = data.map((item) => {
		return {
			...item,
		};
	});

	copy.sort((a, b) => {
		if (a.price < b.price) return -1;
		if (a.price > b.price) return 1;
		return 0;
	});

	for (let i = 1; i < copy.length; i++) {
		yield console.log(
			`next cheaper movie is '${copy[i].movie}' with price uqeal to ${copy[i].price}`
		);
	}
}

const nextPrice = priceUp(movieList);

console.log("");
nextPrice.next();
nextPrice.next();
nextPrice.next();
