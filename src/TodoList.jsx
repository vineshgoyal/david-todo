
import React from "react"
import SingleTodo from "./SingleTodo"
import { BaseApi } from "./BaseUrl"

class TodoList extends React.Component {

  state = {
    user: [

    ],
    currentTitle: "",
    complete: false

  }



  componentDidMount() {
    BaseApi.get("todos").then((res) => {
      this.setState({
        user: res.data
      })
    })

  }

  callback = (callbackData) => {
    let indexData = null;
    BaseApi.delete("todos/" + callbackData).then((res) => {
      //console.log(res.data)
    })
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].id == callbackData) {
        indexData = i;
        console.log(callbackData, indexData)
        this.state.user.splice(indexData, 1)
      }
    }
    this.setState(this.state)

  }


  getData() {
    return this.state.user.map((singleTodo, i) => {
      return <SingleTodo key={singleTodo.id} index={i} id={singleTodo.id} title={singleTodo.title} handler={this.callback} />
    })
  }
  changeData(event) {
    //let newstate = { ...this.state }
    //newstate.currentTitle = event.target.value
    this.setState({
      currentTitle: event.target.value
    })
  }
  onSubmit = () => {
    let newUser = [...this.state.user]
    //console.log(newUser)
    let newstate = {
      title: this.state.currentTitle, // cozz state user has title property so for replace 
      complete: false                //title in newstate we use title.property name should be same
    }

    if (this.state.currentTitle !== "") {
      BaseApi.post("todos", newstate).then((res) => {
        // console.log(res.data)
        newUser.push(res.data)
        this.setState({
          user: newUser,
          currentTitle: ""
        })
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
              onChange={this.changeData.bind(this)} style={{ width: "250px" }} />
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
