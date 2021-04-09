
import React from "react"
import SingleTodo from "./SingleTodo"
import TodoDetail from "./TodoDetail"
import { BaseApi } from "./BaseUrl"
import "./index.css";
class TodoList extends React.Component {

  state = {
    user: [

    ],
    currentTitle: "",
    complete: false,
    selectedId: null,
    checked: false,
    error: null
  }


  // finder() {

  //   var newuser = user.filter(function (singleuser) {
  //     if (singleuser.completed == true) {
  //       return true
  //     }
  //   })

  //   if (newuser.length >= 1) {

  //     console.log(" some user has true value ")
  //   }
  //   else {
  //     console.log(" all value are false ")
  //   }

  // }



  componentDidMount() {
    BaseApi.get("todos").then((res) => {
      // console.log(res.data.complete)
      let newTodo = res.data.filter((singleuser) => {
        // console.log(singleuser)
        if (singleuser.complete === true) {
          return true
        }
      })

      if (newTodo.length >= 1) {
        this.setState({
          user: res.data,
          checked: true
        })
      }
      else {
        this.setState({
          user: res.data,
          checked: false
        })
      }

    })

  }

  callback = (callbackData) => {
    let indexData = null;
    let newUser = [...this.state.user]
    BaseApi.delete("todos/" + callbackData).then((res) => {
      //console.log(res.data)
    })
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].id === callbackData) {
        indexData = i;
        // console.log(callbackData, indexData)
        break;
      }
    }
    if (indexData != null) {
      newUser.splice(indexData, 1)
      //console.log(newUser)
      this.setState({
        user: newUser
      })
    }
  }

  clearAll = () => {
    for (let i = 0; i < this.state.user.length; i++) {
      BaseApi.delete("todos/" + this.state.user[i].id)
    }
    this.setState({ user: [] })
  }

  selectAll = () => {

    let newUser = [...this.state.user]
    for (let i = 0; i < this.state.user.length; i++) {
      BaseApi.patch("todos/" + this.state.user[i].id, { complete: !this.state.checked }).then((res) => {

      })
      newUser[i].complete = !this.state.checked
    }
    this.setState({
      user: newUser,
      checked: true
    })

  }

  UnselectAll = () => {
    let newUser = [...this.state.user]
    for (let i = 0; i < this.state.user.length; i++) {
      BaseApi.patch("todos/" + this.state.user[i].id, { complete: !this.state.checked }).then((res) => {

      })
      newUser[i].complete = !this.state.checked
    }
    this.setState({
      user: newUser,
      checked: false
    })
  }


  update(todo, callbackevent) {
    let indexData = null;
    let checked = callbackevent.target.checked;
    let newUser = [...this.state.user]
    console.log(todo.id)
    BaseApi.patch("todos/" + todo.id, { complete: checked }).then((res) => {
    })
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].id === todo.id) {
        indexData = i
        break
      }
    }
    newUser[indexData].complete = checked
    this.setState({
      user: newUser
    })

  }

  editData = (id) => {
    //console.log(id)
    this.setState({
      selectedId: id
    })
  }

  updateSingleTodo(id, singleTodo) {
    let newState = [...this.state.user]
    let index = null;
    for (let i = 0; i < this.state.user.length; i++) {
      if (this.state.user[i].id === id) {
        index = i
        break;
      }
    }
    if (index != null) {
      BaseApi.patch("todos/" + id, { title: singleTodo.title }).then((res) => { })
      newState[index].title = singleTodo.title
      this.setState({ newState, selectedId: null })
    }
  }


  getData() {
    return this.state.user.map((singleTodo, i) => {
      return <SingleTodo key={singleTodo.id} index={i} id={singleTodo.id} data={singleTodo}
        title={singleTodo.title} handler={this.callback} handler2={this.editData}
        onchangeHandler={this.update.bind(this)} />
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

    if (this.state.currentTitle == "") {
      this.setState({
        error: "Please fill empty field"
      })
      return
    }

    if (this.state.currentTitle !== "") {
      BaseApi.post("todos", newstate).then((res) => {
        // console.log(res.data)
        newUser.push(res.data)
        this.setState({
          user: newUser,
          currentTitle: "",
          error: null
        })
      })

    }
  }

  cancelUpdate = () => {
    this.setState({ selectedId: null })
  }

  render() {

    let count;
    if (this.state.user.length > 0) {
      count = <p>You have {this.state.user.length} pending value</p>
    }
    let select = ""
    let clear = ""
    if (this.state.user.length > 0) {
      clear = <button type="button" className="btn btn-sm ml-1 bg-warning" onClick={this.clearAll} >Clear All</button>
      if (this.state.checked) {
        select = <button type="button" className="btn btn-sm ml-1 bg-primary text-white"
          onClick={this.UnselectAll} >Unselect All</button>
      }
      else {
        select = <button type="button" className="btn btn-sm ml-1 bg-primary text-white"
          onClick={this.selectAll} >Select All</button>
      }
    }
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-5 jumbotron ">

            <h1>Todo App</h1>
            <input placeholder="Add your new todo" className="form-control"
              value={this.state.currentTitle}
              onChange={this.changeData.bind(this)} style={{ width: "250px" }} />
            <button type="button" className="btn btn-sm ml-3" onClick={this.onSubmit}>
              <img src="plus.jpg" alt="submit icon" height="40" width="40" />
            </button><br />
            {this.state.error}
            {count}
            {this.getData()}
            {clear}
            {select}
          </div>
          <div className="col-5">
            <TodoDetail singleData={this.state.selectedId} handler={this.updateSingleTodo.bind(this)} handler2={this.cancelUpdate} />
          </div>
        </div>
      </div>
    )
  }
}

export default TodoList;
