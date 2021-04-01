import axios from "axios"
import React from "react"

export default class SingleTodo extends React.Component {


    deleteData(deletedItem) {

        //console.log(deletedItem, Deleteindex)
        this.props.handler(deletedItem)

    }

    onChangeCheck(select, event) {
        // console.log(select, id, event.target.checked)
        this.props.onchangeHandler(select, event)
    }


    render() {
        let linethrough = ""
        if (this.props.data.complete) {
            linethrough = "complete-item"
        }

        return (
            <>
                <h6
                    className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center">
                    <h6 className={linethrough}> <input type="checkbox" class="form-check-input mt-2"
                        onChange={this.onChangeCheck.bind(this, this.props.data)}
                        checked={this.props.data.complete} />
                        {this.props.title}
                        <button type="button" class="btn btn-sm ml-1 " onClick={
                            this.deleteData.bind(this, this.props.id)
                        }>
                            <img src="delete.png" height="15" width="15" />
                        </button></h6>
                </h6>
            </>

        )
    }
}