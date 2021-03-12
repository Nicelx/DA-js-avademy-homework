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
		price: 223,
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

// fun declaration + do while
function lowestPrice(data) {
	let i = 1,
		minPrice = data[0].price,
		movie = data[0];
	do {
		if (minPrice > data[i].price && data[i].price > 0) {
			minPrice = data[i].price;
			movie = data[i]
		}
		i++;
	} while (i < data.length - 1);

	console.log(`movie with lowest price: ${movie.price} is '${movie.movie}' in genre: ${movie.genre}`);
}

// fun expression + while
const higherPrice = fuction(data) {
	let i = 0,
	maxPrice = (data[0].price > 0 && data[0].price),
	movie = maxPrice && data[0];

	while (i < data.length) {
		if (maxPrice < data[i].price && )
	}
}


lowestPrice(movieList);
