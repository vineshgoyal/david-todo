import axios from "axios"
import React from "react"

export default class SingleTodo extends React.Component {


    deleteData(deletedItem, Deleteindex) {

        //console.log(deletedItem, Deleteindex)
        this.props.handler(deletedItem, Deleteindex)

    }


    render() {

        return (
            <>
                <h6
                    className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center">
                    <input type="checkbox" class="form-check-input mt-2" value="" />
                    {this.props.title}
                    <button type="button" class="btn btn-sm ml-1 " onClick={
                        this.deleteData.bind(this, this.props.id, this.props.index)
                    }>
                        <img src="delete.png" height="15" width="15" />
                    </button>
                </h6>
            </>

        )
    }
}