import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';

let columns = [
    { field: 'ticker', headerName: 'Ticker', width: 200},
    { field: 'spread', headerName: 'Spread', width: 200 }
]

class HelloWorld extends Component {
    state = {
        spread: null
    }


    componentDidMount() {
        fetch("/api/waz/spread")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ spread: result })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            this.state.spread ?
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={row => row.ticker}
                        rows={this.state.spread}
                        columns={columns}
                        pageSize={100}
                        rowsPerPageOptions={[100]}
                    />
                </div>
                : null
        )
    }
}

export default HelloWorld