import React, { Component } from "react";
import TablePagination from '@mui/material/TablePagination';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from '@mui/material/Stack';
import { API_WAZ_SPREAD } from "../../Config";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import {
    DataGrid,
    useGridSlotComponentProps,
} from '@mui/x-data-grid';
import { Box } from "@mui/system";

function CustomPagination() {
    const { state, apiRef, options } = useGridSlotComponentProps();
    return (
        <React.Fragment>
            <Stack direction="row" spacing={2}>
                <LoadingButton size="small" variant="outlined" startIcon={<RefreshIcon />}>
                    Refresh  </LoadingButton>

                <TablePagination
                    count={state.pagination.rowCount}
                    page={state.pagination.page}
                    onPageChange={(event, value) => apiRef.current.setPage(value)}
                    rowsPerPage={options.pageSize}
                    rowsPerPageOptions={[50]}
                />
            </Stack>
        </React.Fragment>
    );
}

let columns = [
    { field: 'name', headerName: 'Ticker', flex: 1 },
    { field: 'spread', headerName: 'Spread', flex: 1, renderCell: (params) => params.value.toLocaleString() }
]

class WazSpread extends Component {
    state = {
        spread: null
    }


    componentDidMount() {
        fetch(API_WAZ_SPREAD)
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
            <React.Fragment>
                <Container sx={{ mt: 2, }}>
                    <Paper
                        sx={{
                            height: '85vh',
                            p: 2,
                            m: 2,
                        }}
                    >
                        {this.state.spread ?
                        <DataGrid
                            rows={this.state.spread}
                            columns={columns}
                            getRowId={(row) => row._id}
                            pageSize={50}
                            components={{ Pagination: CustomPagination }}
                        /> 
                        : <Box>Oh No! API Failure!</Box>}
                    </Paper>
                </Container>
            </React.Fragment>
        )
    }
}

export default WazSpread