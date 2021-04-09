
import React, { useState, useEffect } from "react"
import SingleTodo from "./SingleTodo"
import UserDetail from "./UserDetail"
import { BaseApi } from "./BaseUrl"
import "./index.css";
function TodoList() {

  const [todoList, setTodoList] = useState([])
  const [currentTitle, setcurrentTitle] = useState("")
  const [selectedData, selectfunc] = useState({})
  const [checked, selectcheck] = useState(false)



  useEffect(function () {
    BaseApi.get("todos").then((res) => {
      //console.log(res.data)
      let newTodo = res.data.filter(function (singleTodo) {
        if (singleTodo.complete == true) {
          return true
        }
      })
      if (newTodo.length >= 1) {
        setTodoList([...res.data])
        selectcheck(!checked)
      }
      else {
        setTodoList([...res.data])
        selectcheck(checked)
      }

    })
  }, [])

  function deleteTodo(item) {

    let index = null
    let newTodo = [...todoList]
    // console.log(item)
    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id == item) {
        index = i
        break
      }
    }

    if (index != null) {
      BaseApi.delete("todos/" + item).then((res) => {
        newTodo.splice(index, 1)
        setTodoList(newTodo)
      })

    }
  }

  function deleteAll() {
    for (let i = 0; i < todoList.length; i++) {
      BaseApi.delete("todos/" + todoList[i].id).then((res) => { })
    }
    // todoList.splice(0, todoList.length)
    // todoList = []
    setTodoList([])
  }

  function selectAll() {
    for (let i = 0; i < todoList.length; i++) {
      BaseApi.patch("todos/" + todoList[i].id, { complete: !checked }).then((res) => { })
      todoList[i].complete = !checked
    }

    setTodoList([...todoList])
    selectcheck(!checked)
    // console.log("select all")
  }



  function update(todo, checked) {
    // console.log(checked)
    let index = null
    let newTodo = [...todoList]

    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id == todo.id) {
        index = i
        break
      }
    }

    BaseApi.patch("todos/" + todo.id, { complete: checked }).then((res) => {
      //console.log(res.data)
      if (index != null) {
        newTodo[index].complete = checked
        setTodoList(newTodo)
        selectcheck(checked)
      }

    })

    // let FilterData = newTodo.filter(function (singleUser) {
    //   if (singleUser.complete == true) {
    //     return true
    //   }
    // })

    // if (FilterData.length >= 1) {
    //   if (index != null) {
    //     newTodo[index].complete = !checked
    //     setTodoList(newTodo)
    //     selectcheck(!checked)
    //   }
    // }
    // else {

    //   if (index != null) {
    //     newTodo[index].complete = checked
    //     setTodoList(newTodo)
    //     selectcheck(checked)
    //   }

    // }


  }

  function singleItem(data) {
    selectfunc({ ...data })

    // console.log(id)
  }

  //console.log(selectedData)
  function getData() {
    return todoList.map((singleTodo, i) => {
      return <SingleTodo key={singleTodo.id} index={i} data={singleTodo}
        title={singleTodo.title} handler={deleteTodo} onchangeHandler={update} EditInfo={singleItem} />
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

      BaseApi.post("todos", singleTodo).then((res) => {
        newTodo.push(res.data)
        setTodoList(newTodo)
        setcurrentTitle("")
      })

    }
  }

  function updatedData(id, singleTodo) {
    let index = null;
    BaseApi.patch("todos/" + id, { title: singleTodo.title }).then((res) => { })
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        index = i;
        break
      }

    }

    if (index != null) {
      todoList[index].title = singleTodo.title
      setTodoList([...todoList])
      selectfunc({})
    }

  }

  let select = ""
  if (!checked) {
    select = <button type="button" class="btn btn-sm ml-1 bg-warning mt-2" onClick={selectAll} >Select All</button>
  }
  else {
    select = <button type="button" class="btn btn-sm ml-1 bg-warning mt-2" onClick={selectAll} > Unselect All</ button>
  }

  let count;
  if (todoList.length > 0) {
    count = <p>You have {todoList.length} pending value</p>
  }
  return (
    <div className="container mt-4" >
      <div className="row">
        <div className="col"></div>
        <div className="col-5 jumbotron">
          <h1>Todo App</h1>
          <input placeholder="Add your new todo" className=""
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
          <button type="button" class="btn btn-sm ml-1 bg-primary mt-2" onClick={deleteAll} >Clear All</button>
          {select}
        </div>
        <div className="col"></div>
        <div className="col-5 ">
          <UserDetail selectedTodo={selectedData.id} handler={updatedData} />
        </div>
      </div>
    </div>
  )

}

export default TodoList;
