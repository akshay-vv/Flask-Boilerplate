import React, { Component, useContext, useState, useEffect } from "react";
import TablePagination from '@mui/material/TablePagination';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AuthContext from "../Component/auth/AuthContext";
import { spread as apiSpread, calculateSpread as apiCalculateSpread } from "../Services/WazService";
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

    const calculateSpread = async e => {
        const response = await apiCalculateSpread()
        setSpread(response)
    }

    CustomPagination = () => {
        const { state, apiRef, options } = useGridSlotComponentProps();
        const refreshButton = authContext.auth?.user ? <LoadingButton size="small" onClick={calculateSpread} variant="outlined" startIcon={<RefreshIcon />}>
            Refresh  </LoadingButton> : null
        return (
            <React.Fragment>
                {refreshButton}
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

    useEffect(() => {
        async function fetchSpread() {
            const response = await apiSpread()
            setSpread(response)
        }
        fetchSpread();
    }, [])

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
