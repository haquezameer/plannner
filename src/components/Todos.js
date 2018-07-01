import React, { Component } from "react";
import update from 'immutability-helper';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkBackspace = this.checkBackspace.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const todo = this.state.text;
    this.setState({ todos: [...this.state.todos, todo] });
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTodoChange(e, todoIndex) {
    const text = e.target.value;
    const newTodos = update(this.state.todos, { [todoIndex]: { $set: text } });
    this.setState({ todos: newTodos });
  }
  checkBackspace(e, todoIndex) {
    const code = e.keyCode || e.charCode;
    if (code === 8 || code === 0) {
      const todos = this.state.todos;
      const targetTodo = todos[todoIndex];
      if (targetTodo.length === 0) {
        const start = todoIndex;
        const deleteCount = 1;
        const newTodos = update(todos, { $splice: [[start, deleteCount]] });
        this.setState({ todos: newTodos });
      }
    }
  }
  render() {
    const { todos } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.text}
            onChange={this.handleChange}
            name="text"
            type="text"
          />
          <input type="submit" value="submit" />
        </form>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>
              <input
                type="text"
                name={todo}
                value={todo}
                onKeyDown={e => { this.checkBackspace(e, i) }}
                onChange={e => {
                  this.handleTodoChange(e, i);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todos;
