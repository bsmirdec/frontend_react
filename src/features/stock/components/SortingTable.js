import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Box,
    TablePagination,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

// Fonction pour trier de manière stable
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Fonction de comparaison pour le tri
function getComparator(order, orderBy) {
    if (orderBy === "quantity") {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    } else {
        // Tri alphabétique par défaut pour les autres colonnes
        return order === "desc"
            ? (a, b) => (a[orderBy] > b[orderBy] ? -1 : 1)
            : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
    }
}

// Fonction de comparaison descendante
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function SortingTable({ stocks, maxStocks }) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSortRequest = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = stableSort(stocks, getComparator(order, orderBy));

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, stocks.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function findMaxStockQuantity(product_id, maxStocks) {
        const maxStockItem = maxStocks.find(
            (item) => item.product.product_id === product_id,
        );
        return maxStockItem ? maxStockItem.quantity : null;
    }

    return (
        <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="sortable table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "type"}
                                direction={orderBy === "type" ? order : "asc"}
                                onClick={() => handleSortRequest("type")}
                            >
                                Type
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "name"}
                                direction={orderBy === "name" ? order : "asc"}
                                onClick={() => handleSortRequest("name")}
                            >
                                Produit
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "quantity"}
                                direction={
                                    orderBy === "quantity" ? order : "asc"
                                }
                                onClick={() => handleSortRequest("quantity")}
                            >
                                Quantité
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === "quantity-max"}
                                direction={
                                    orderBy === "quantity-max" ? order : "asc"
                                }
                                onClick={() =>
                                    handleSortRequest("quantity-max")
                                }
                            >
                                Quantité Max
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                        )
                        .map((item) => (
                            <TableRow key={item.product.product_id}>
                                <TableCell>{item.product.type.name}</TableCell>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell
                                    style={{
                                        color: "#FF0000",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {findMaxStockQuantity(
                                        item.product.product_id,
                                        maxStocks,
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={3} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={stocks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default SortingTable;
