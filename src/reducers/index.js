const initialState = {
	artists: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_ARTIST":
			return {
				...state,
				artists: [...state.artists, action.payload],
			};
		case "REMOVE_ARTIST":
			const id = action.payload;
			const filterArtists = state.artists.filter((i) => i.id !== id);
			return {
				...state,
				artists: [...filterArtists],
			};
		default:
			return state;
	}
};
export default reducer;
