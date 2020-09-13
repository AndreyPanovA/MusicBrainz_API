import { h, Component } from "preact";
import { connect } from "preact-redux";
import { saveArtist, removeArtist } from "../actions/index";
import ArtistItem from "./artist-item";
import "../style/list.module.less";
import cls from "../style/list.module.less";
import store from "../store";
import SelectedItems from "./selectedItems";

class App extends Component {
	state = { load: false };
	async xml2json(text) {
		let vm = this;
		let response = await fetch(
			`https://musicbrainz.org/ws/2/artist?query=name:${text}`
		);
		response = await response.text();
		let parser = new DOMParser();
		let json = [];
		let xmlObj = await parser.parseFromString(response, "application/xml");
		xmlObj.querySelectorAll("artist").forEach((el, idx) => {
			json.push({ id: el.id });
			el.childNodes.forEach((n) => {
				if (n.textContent) {
					json[idx][n.nodeName] = n.textContent;
				}
			});
			vm.setState({ json, load: true });
		});
	}
	removeArtistById = (id) => {
		this.props.removeArtist(id);
		console.log(store.getState());
	};

	updateText = (e) => {
		this.setState({ text: e.target.value });
		this.xml2json(this.state.text);
	};
	onSave = (elem) => {
		this.props.saveArtist(elem);
		this.setState({ text: "" });
		console.log(store.getState());
	};
	render({}, { text }) {
		return (
			<div id="app">
				<SelectedItems
					selectedArtists={store.getState().artists}
					onRemove={this.removeArtistById}
				/>
				<form action="javascript:">
					<input
						value={text}
						onInput={this.updateText}
						placeholder="New ToDo..."
					/>
				</form>
				<ul className={"ul"}>
					{this.state.load
						? this.state.json.map((el, idx) => (
								<ArtistItem
									key={el.id}
									onRemove={this.removeArtistById}
									item={el}
									onSave={this.onSave}
								/>
						  ))
						: null}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = ({ artists }) => {
	return {
		artists,
	};
};
const mapDispatchToProps = {
	saveArtist,
	removeArtist,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
