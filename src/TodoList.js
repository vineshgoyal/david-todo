
import React from "react"
import SingleTodo from "./SingleTodo"

class TodoList extends React.Component {

  state = {
    user: [

    ],
    currentTittle: "",
    count: 0

  }

  getData() {
    return this.state.user.map((singleTodo, i) => {
      return <SingleTodo key={i} tittle={singleTodo.tittle} />

    })
  }
  changeData = (event) => {
    this.state.currentTittle = event.target.value
    this.setState(this.state)
  }
  onSubmit = () => {
    let newUser = {
      tittle: this.state.currentTittle
    }
    if (this.state.currentTittle == "") {
      newUser.tittle = undefined
    }
    else {
      this.state.count = this.state.count + 1
      this.state.user.push(newUser)
      this.state.currentTittle = ""
      this.setState(this.state)
    }
  }

  render() {
    let count;
    if (this.state.count > 0) {
      count = <p>You have {this.state.count} pending value</p>
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col"></div>
          <div className="col jumbotron">
            <h1>Todo App</h1>
            <input placeholder="Add your new todo"
              value={this.state.currentTittle}
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
