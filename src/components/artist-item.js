import { h, Component } from "preact";

export default class ArtistItem extends Component {
	render() {
		let {
			onRemove,
			onSave,
			item: { name, id },
			item,
		} = this.props;
		return (
			<li>
				<button onClick={() => onSave(item)}>+</button>
				{" " + name}
				<button onClick={() => onRemove(id)}>×</button>
			</li>
		);
	}
}
