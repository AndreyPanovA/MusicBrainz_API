import { h, Component } from "preact";
import { connect } from "preact-redux";
import reduce from "../reducers";
import * as actions from "../actions";
import TodoItem from "./todo-item";
import "../style/list.module.less";
import cls from "../style/list.module.less";

class App extends Component {
	state = { load: false };
	async xml2json() {
		let vm = this;
		let response = await fetch(
			"http://musicbrainz.org/ws/2/cdstub/?query=title:Doo"
		);
		response = await response.text();
		let parser = new DOMParser();
		let json = [];
		let xmlObj = await parser.parseFromString(response, "application/xml");
		xmlObj.querySelectorAll("metadata cdstub").forEach((el, idx) => {
			json.push({ id: el.id });
			el.childNodes.forEach((n) => {
				if (n.textContent) {
					json[idx][n.nodeName] = n.textContent;
				}
			});
			vm.setState({ json, load: true });
		});
	}
	componentDidMount() {
		console.log("test");
		this.xml2json();
	}
	addTodos = () => {
		this.props.addTodo(this.state.text);
		this.setState({ text: "" });
	};

	removeTodo = (todo) => {
		this.props.removeTodo(todo);
	};

	updateText = (e) => {
		this.setState({ text: e.target.value });
	};

	render({ todos }, { text }) {
		// console.log(this.state.json);
		if (this.state.load == true) {
			console.log(this.state.json[0].id);
		}
		console.log(cls);
		return (
			<div id="app">
				{/* {this.state.json[0]} */}
				<form onSubmit={this.addTodos} action="javascript:">
					<input
						value={text}
						onInput={this.updateText}
						placeholder="New ToDo..."
					/>
				</form>
				<ul className={cls.ul}>
					{/* {todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} onRemove={this.removeTodo} />
					))} */}
					{this.state.load
						? this.state.json.map((el, idx) => <li key={el.id}>{el.title}</li>)
						: null}
				</ul>
			</div>
		);
	}
}
export default connect(reduce, actions)(App);
