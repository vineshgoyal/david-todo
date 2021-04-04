import React, { useEffect, useState } from "react"
import { BaseApi } from "./BaseUrl"


export default function UserDetail(props) {

    const [todoSingle, selectfunc] = useState({})
    const [detail, cancelfunc] = useState(true)
    useEffect(function () {

        if (props.selectedTodo != undefined) {

            BaseApi.get("todos/" + props.selectedTodo).then((res) => {

                //console.log({ ...res.data })

                selectfunc({ ...res.data })

            })
        }

    }, [props.selectedTodo])

    // console.log(todoSingle)

    function add() {
        let singleTodo = {
            title: todoSingle.title,
            complete: false
        }

        // BaseApi.patch("todos/" + props.selectedTodo, { title: todoSingle.title }).then((res) => { })

        // console.log(props.selectedTodo, singleTodo)
        props.handler(props.selectedTodo, singleTodo)

    }

    function changeTitle(event) {
        todoSingle.title = event.target.value
        //  console.log(todoSingle.title)
        selectfunc({ ...todoSingle })

    }

    function cancel() {
        cancelfunc(false)

    }

    if (props.selectedTodo == undefined) {
        return null
    }

    let data = null

    if (detail == true) {

        data = <div className="jumbotron bg-warning">
            <h2>TodoList Detail is Below:</h2>
            <input className="form-control" value={todoSingle.title} onChange={changeTitle} /> <br />
            <button type="button" class="btn btn-sm ml-1 bg-primary mt-2" onClick={add} >
                Submit
       </button>
            <button type="button" class="btn btn-sm ml-1 bg-primary mt-2" onClick={cancel} >
                Cancel
        </button>
        </div>

    }


    return (



        <>
            {data}
        </>
    )

}