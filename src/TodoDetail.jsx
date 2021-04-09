import React from "react"
import { BaseApi } from "./BaseUrl"

export default class TodoDetail extends React.Component {

    state = {
        todo: {
            title: ""
        }

    }

    shouldComponentUpdate(props) {
        // console.log('should props, newProps:', props.singleData, this.state.todo.id)
        if (props.singleData != null && props.singleData !== this.state.todo.id) {
            BaseApi.get("todos/" + props.singleData).then((res) => {
                this.setState({
                    todo: { ...res.data }
                })
                // console.log(this.state.todo)
            })

        }
        return true
    }
    // componentDidUpdate() {
    //     let SingleTodo = { ...this.state.todo }
    //     //console.log("this.props ", this.props)
    //     BaseApi.get("todos/" + this.props.singleData).then((res) => {
    //         SingleTodo = { ...res.data }
    //         this.setState(SingleTodo)
    //     })


    // }


    changeData(event) {
        // this.state.todo.title = event.target.value
        // console.log({ ...this.state.todo }) // why changing before setstate???
        // let newtodo = { ...this.state.todo }
        // newtodo.title = event.target.value
        this.setState({

            todo: {
                ...this.state.todo, // second level bacause we change inside the object.if we have single string then it will replace full object
                title: event.target.value
            }

        })
    }
    update = () => {
        let SingleTodo = {
            title: this.state.todo.title,
            complete: true

        }
        // this.state.todo.title = ""
        this.setState({
            todo: {
                ...this.state.todo,
                title: ""
            }
        })


        this.props.handler(this.props.singleData, SingleTodo)

    }

    cancel = () => {
        this.props.handler2()
    }

    render() {
        if (this.props.singleData == null) {
            return null
        }
        // console.log(this.state.todo)

        return (
            <div className="jumbotron bg-warning">
                <h3>Detail for Single Todo is below:</h3><br />
                <input value={this.state.todo.title} className="form-control" onChange={this.changeData.bind(this)} /><br />
                <button type="button" className="btn btn-sm ml-1 bg-primary text-white" onClick={this.update}>Update</button>
                <button type="button" className="btn btn-sm ml-1 bg-primary text-white" onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
}