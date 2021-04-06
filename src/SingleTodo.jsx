import axios from "axios"
import React from "react"

export default class SingleTodo extends React.Component {


    deleteData(deletedItem) {

        //console.log(deletedItem, Deleteindex)
        this.props.handler(deletedItem)

    }

    editInfo() {
        this.props.handler2(this.props.data.id)
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
                <div
                    className="list-group-item list-group-item-action list-group-item-secondary bg-secondry text-center">
                    <h6 className={linethrough}> <input type="checkbox" className="form-check-input mt-2"
                        onChange={this.onChangeCheck.bind(this, this.props.data)}
                        checked={this.props.data.complete} />
                        {this.props.title}
                        <button type="button" className="btn btn-sm ml-1 bg-primary text-white" onClick={
                            this.editInfo.bind(this)
                        }>
                            Edit
                        </button>
                        <button type="button" className="btn btn-sm ml-1 pull-right " onClick={
                            this.deleteData.bind(this, this.props.id)
                        }>
                            <img src="delete.png" height="15" width="15" />
                        </button>
                    </h6>
                </div>
                <br />
            </>

        )
    }
}