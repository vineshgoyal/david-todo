import React from "react"
import { BaseApi } from "./BaseUrl"
import SingleTodo from "./SingleTodo";

export default class TodoDetail extends React.Component {

    state = {
        title: ""
    }

    shouldComponentUpdate(props) {
        console.log('should props, newProps:', props, this.state)
        if (props.singleData !== null && props.singleData !== this.state.id) {
            return true
        } else {
            return false
        }

    }
    componentDidUpdate() {
        let SingleTodo = { ...this.state }
        console.log("this.props ", this.props)
        BaseApi.get("todos/" + this.props.singleData).then((res) => {
            SingleTodo = { ...res.data }
            this.setState(SingleTodo)
        })


    }

    // componentDidUpdate(prevsProps) {
    //     if (this.props.singleData != prevsProps.id) {
    //         BaseApi.get("todos/" + this.props.singleData).then((res) => {
    //             this.setState({ ...res.data })
    //         })
    //     }

    // }

    changeData(event) {

        this.setState({
            title: event.target.value
        })
    }
    update = () => {
        let SingleTodo = {
            title: this.state.title,
            complete: true

        }

        this.props.handler(this.props.singleData, SingleTodo)
    }

    cancel = () => {
        this.props.handler2()
    }

    render() {
        if (this.props.singleData == null) {
            return null
        }
        return (
            <div className="jumbotron bg-warning">
                <h3>Detail for Single Todo is below:</h3><br />
                <input value={this.state.title} className="form-control" onChange={this.changeData.bind(this)} /><br />
                <button type="button" className="btn btn-sm ml-1 bg-primary text-white" onClick={this.update}>Update</button>
                <button type="button" className="btn btn-sm ml-1 bg-primary text-white" onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
}