import axios from "axios"
import React from "react"

export default function SingleTodo(props) {


    function deleteData() {

        // console.log(props.id)
        props.handler(props.data.id)

    }

    function onChangeCheck(event) {
        // console.log(props.data, event.target.checked)
        props.onchangeHandler(props.data, event.target.checked)
    }
    function userInfo() {
        //  console.log(props.id)
        props.EditInfo(props.data)
    }


    let linethrough = ""
    if (props.data.complete) {
        linethrough = "complete-item"
    }

    return (
        <>
            <div
                className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center mb-2">
                <h5 className={linethrough}>
                    <input type="checkbox" class="form-check-input mt-2 "
                        onChange={onChangeCheck}
                        checked={props.data.complete}
                    />
                    {props.title}
                    <button type="button" class="btn btn-sm ml-1 bg-primary " onClick={userInfo}>
                        Edit
                    </button>
                    <button type="button" class="btn btn-sm ml-1 " onClick={deleteData}>
                        <img src="delete.png" height="15" width="15" />
                    </button>
                </h5>

            </div>
        </>

    )

}