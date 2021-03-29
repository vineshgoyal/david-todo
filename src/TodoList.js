
import axios from "axios"
import React from "react"
import SingleTodo from "./SingleTodo"

class TodoList extends React.Component {

  state = {
    user: [

    ],
    currentTitle: "",

  }

  newstate = { ...this.state }

  componentDidMount() {
    axios.get("http://localhost:4000/todos").then((res) => {
      this.state.user = [...res.data]
      this.setState(this.state)
    })

  }


  getData() {
    return this.state.user.map((singleTodo, i) => {
      return <SingleTodo id={singleTodo.id} title={singleTodo.title} />
    })
  }
  changeData = (event) => {
    this.newstate.currentTitle = event.target.value
    this.setState(this.newstate)
  }
  onSubmit = () => {

    let newUser = {
      title: this.state.currentTitle // cozz state is update by changedata function we can also use newstate title.
    }
    if (this.state.currentTitle !== "") {
      axios.post("http://localhost:4000/todos", newUser).then((res) => {
        console.log(res.data)
        this.newstate.user.push(res.data)
        this.newstate.currentTitle = ""
        this.setState(this.newstate)
      })

    }
  }

  render() {
    let count;
    if (this.state.user.length > 0) {
      count = <p>You have {this.state.user.length} pending value</p>
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col"></div>
          <div className="col jumbotron">
            <h1>Todo App</h1>
            <input placeholder="Add your new todo"
              value={this.state.currentTitle}
              onChange={this.changeData} style={{ width: "250px" }} />
            <button type="button" class="btn btn-sm ml-3" onClick={this.onSubmit}>
              <img src="plus.jpg" height="40" width="40" />
            </button>
            {count}
            {this.getData()}
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

export default TodoList;
