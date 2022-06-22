import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Portfolio() {
    const [trades, setTrades] = useState()
    const [transactions, setTransactions] = useState([])

    const processTrades = e => {
        e.preventDefault()
        let lines = trades.split(/\r?\n/)

        let txs = []
        lines.forEach(line => {
            let parsed_ln = JSON.parse(line)
            txs = txs.concat(parsed_ln)
        })
        txs = txs.filter(tx => tx.state === 'done')
        setTransactions(txs)
    }

    console.log(transactions)
    return (
        <Grid container justifyContent="center">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-multiline-static"
                    label="P2P"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    onChange={e => setTrades(e.target.value)}
                />
                <button type="button" onClick={e => processTrades(e)}> Calculate </button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="P2P Transactions">
                        <TableHead>
                            <TableRow>
                                <TableCell>Pair</TableCell>
                                <TableCell align="right">Bid/Ask</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Volume</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.market}
                                    </TableCell>
                                    <TableCell align="right">{row.kind}</TableCell>
                                    <TableCell align="right">{row.uat}</TableCell>
                                    <TableCell align="right">{row.origin_volume}</TableCell>
                                    <TableCell align="right">{row.avg_price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    )
}