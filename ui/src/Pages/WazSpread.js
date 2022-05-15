import React, { Component, useContext, useState, useEffect } from "react";
import TablePagination from '@mui/material/TablePagination';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Stack from '@mui/material/Stack';
import { API_WAZ_SPREAD } from "../Config";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AuthContext from "../Component/auth/AuthContext";
import {
    DataGrid,
    useGridSlotComponentProps,
} from '@mui/x-data-grid';
import { Box } from "@mui/system";

function CustomPagination() {
    const { state, apiRef, options } = useGridSlotComponentProps();
    return (
        <React.Fragment>
            <LoadingButton size="small" variant="outlined" startIcon={<RefreshIcon />}>
                Refresh  </LoadingButton>
            <TablePagination
                component="div"
                count={state.pagination.rowCount}
                page={state.pagination.page}
                onPageChange={(event, value) => apiRef.current.setPage(value)}
                rowsPerPage={options.pageSize}
                rowsPerPageOptions={[50]}
            >
            </TablePagination>
        </React.Fragment>
    );
}

let columns = [
    { field: 'name', headerName: 'Ticker', flex: 1 },
    { field: 'spread', headerName: 'Spread', flex: 1, renderCell: (params) => params.value.toLocaleString() }
]

export default function WazSpread() {
    const [spread, setSpread] = useState(null)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        fetch(API_WAZ_SPREAD)
            .then((res) => {
                console.log("Inspecting Response...")
                // console.log(res)
                // console.log(res.json())

                return res.json()
            })
            .then(
                (result) => {
                    setSpread(result)
                },
                (error) => {
                    console.log(error)
                    console.log('hit2')
                }
            ).catch((err) => {
                console.log('hit')
                console.log(err)
            })
    }, [])

    console.log(authContext)
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
                    {spread ?
                        <DataGrid
                            rows={spread}
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
