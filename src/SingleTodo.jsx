import axios from "axios"
import React from "react"

export default class SingleTodo extends React.Component {


    // deleteData = (deletedItem) => {

    //     //console.log(deletedItem)
    //     axios.delete("http://localhost:4000/todos" + { deletedItem }).then((res) => {

    //     })
    // }


    render() {

        return (
            <>
                <h6
                    className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center">
                    <input type="checkbox" class="form-check-input mt-2" value="" />
                    {this.props.title}
                    {/* <button type="button" class="btn btn-sm ml-1 " onClick={() => {
                        this.deleteData(this.props.id)
                    }}>
                        <img src="delete.png" height="15" width="15" />
                    </button> */}
                </h6>
            </>

        )
    }
}