const toggleFavorite = (name: string) => {
	let favorites: string[] = JSON.parse(
		localStorage.getItem('favorites') || '[]'
	);

	if (favorites.includes(name)) {
		favorites = favorites.filter((pokeId) => pokeId !== name);
	} else {
		favorites.push(name);
	}

	localStorage.setItem('favorites', JSON.stringify(favorites));
};

const isFavorite = (name: string): boolean => {
	let favorites: string[] = JSON.parse(
		localStorage.getItem('favorites') || '[]'
	);

	if (favorites.includes(name)) {
		return true;
	} else {
		return false;
	}
};

const listFavorites = (): string[] => {
	return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export default { toggleFavorite, isFavorite, listFavorites };
