const saveArtist = (newArtist) => {
	return {
		type: "SAVE_ARTIST",
		payload: newArtist,
	};
};
const removeArtist = (id) => {
	return {
		type: "REMOVE_ARTIST",
		payload: id,
	};
};

export { saveArtist, removeArtist };
