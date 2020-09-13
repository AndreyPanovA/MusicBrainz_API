const SelectedItems = ({ selectedArtists, onRemove }) => {
	return (
		<ul>
			{selectedArtists.map((el, idx) => (
				<li key={idx}>
					{el.name} <button onClick={() => onRemove(el.id)}>×</button>
				</li>
			))}
		</ul>
	);
};

export default SelectedItems;
