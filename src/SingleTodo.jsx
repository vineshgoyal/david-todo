import axios from "axios"
import React from "react"

export default function SingleTodo(props) {


    function deleteData() {

        // console.log(props.id)
        props.handler(props.id)

    }

    function onChangeCheck(event) {
        // console.log(props.data, event.target.checked)
        props.onchangeHandler(props.data, event.target.checked)
    }


    let linethrough = ""
    if (props.data.complete) {
        linethrough = "complete-item"
    }

    return (
        <>
            <h6
                className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center">
                <h6 className={linethrough}>
                    <input type="checkbox" class="form-check-input mt-2"
                        onChange={onChangeCheck}
                        checked={props.data.complete}
                    />
                    {props.title}
                    <button type="button" class="btn btn-sm ml-1 " onClick={deleteData}>
                        <img src="delete.png" height="15" width="15" />
                    </button></h6> <br />

            </h6>
        </>

    )

}