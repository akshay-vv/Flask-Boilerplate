import React, { Component } from "react";

class HelloWorld extends Component {
    state = {
        title: null
    }

    componentDidMount() {
        fetch("/api/test")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ title: result.title })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            this.state.title ? <p>Title: {this.state.title}</p> : null
        )
    }
}

export default HelloWorld