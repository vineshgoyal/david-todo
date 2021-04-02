
import React, { useState, useEffect } from "react"
import SingleTodo from "./SingleTodo"
import { BaseApi } from "./BaseUrl"
import "./index.css";
function TodoList() {

  const [todoList, setTodoList] = useState([])
  const [currentTitle, setcurrentTitle] = useState("")

  // state = {
  //   user: [

  //   ],
  //   currentTitle: "",
  //   complete: false

  // }



  // componentDidMount() {
  //   BaseApi.get("todos").then((res) => {
  //     this.setState({
  //       user: res.data
  //     })
  //   })

  // }

  // callback = (callbackData) => {
  //   let indexData = null;
  //   let newUser = [...this.state.user]
  //   BaseApi.delete("todos/" + callbackData).then((res) => {
  //     //console.log(res.data)
  //   })
  //   for (let i = 0; i < this.state.user.length; i++) {
  //     if (this.state.user[i].id == callbackData) {
  //       indexData = i;
  //       // console.log(callbackData, indexData)
  //       break;
  //     }
  //   }
  //   if (indexData != null) {
  //     newUser.splice(indexData, 1)
  //     //console.log(newUser)
  //     this.setState({
  //       user: newUser
  //     })
  //   }


  // }


  // update(todo, callbackevent) {
  //   let indexData = null;
  //   let checked = callbackevent.target.checked;
  //   let newUser = [...this.state.user]
  //   console.log(todo.id)
  //   BaseApi.patch("todos/" + todo.id, { complete: checked }).then((res) => {
  //   })
  //   for (let i = 0; i < this.state.user.length; i++) {
  //     if (this.state.user[i].id == todo.id) {
  //       indexData = i
  //       break
  //     }
  //   }
  //   newUser[indexData].complete = checked
  //   this.setState({
  //     user: newUser
  //   })

  // }




  useEffect(function () {
    BaseApi.get("todos").then((res) => {
      setTodoList([...res.data])
    })
  }, []) // not add if we not use empty array??

  function deleteTodo(item) {

    let index = null
    let newTodo = [...todoList]
    console.log(newTodo)
    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id == item) {
        index = i
        break
      }
    }
    newTodo.splice(index, 1)
    setTodoList(newTodo)
    BaseApi.delete("todos/" + item).then((res) => { })
  }

  function deleteAll() {
    for (let i = 0; i < todoList.length; i++) {
      BaseApi.delete("todos/" + todoList[i].id).then((res) => { })
    }
    // todoList.splice(0, todoList.length)
    // todoList = []
    setTodoList([])
  }

  function update(todo, checked) {
    // console.log(checked)
    let index = null
    let newTodo = [...todoList]
    BaseApi.patch("todos/" + todo.id, { complete: checked }).then((res) => { })
    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id == todo.id) {
        index = i
        break
      }
    }

    newTodo[index].complete = checked
    setTodoList([...newTodo])
  }

  function getData() {
    return todoList.map((singleTodo, i) => {
      return <SingleTodo key={singleTodo.id} index={i} id={singleTodo.id} data={singleTodo}
        title={singleTodo.title} handler={deleteTodo} onchangeHandler={update} />
    })
  }
  function changeData(event) {
    setcurrentTitle(
      event.target.value
    )
  }
  function onSubmit() {
    let newTodo = [...todoList]
    let singleTodo = {
      title: currentTitle,
      complete: false
    }
    if (currentTitle !== "") {
      newTodo.push(singleTodo)
      setTodoList(newTodo)
      BaseApi.post("todos", singleTodo).then((res) => { })
      setcurrentTitle("")
    }
  }

  //   if (this.state.currentTitle !== "") {
  //     BaseApi.post("todos", newstate).then((res) => {
  //       console.log(res.data)
  //       newUser.push(res.data)
  //       this.setState({
  //         user: newUser,
  //         currentTitle: ""
  //       })
  //     })

  //   }
  // }


  let count;
  if (todoList.length > 0) {
    count = <p>You have {todoList.length} pending value</p>
  }
  return (
    <div className="container mt-4" >
      <div className="row">
        <div className="col"></div>
        <div className="col jumbotron">
          <h1>Todo App</h1>
          <input placeholder="Add your new todo"
            value={currentTitle}
            onChange={changeData}
            style={{ width: "250px" }} />
          <button type="button" class="btn btn-sm ml-3"
            onClick={onSubmit}
          >
            <img src="plus.jpg" height="40" width="40" />
          </button>
          {count}
          {getData()}
          <button type="button" class="btn btn-sm ml-1 bg-primary" onClick={deleteAll} >Clear All</button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )

}

export default TodoList;
