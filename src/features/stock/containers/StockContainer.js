import useStocksForWorksiteQuery from "../hooks/useStocksForWorksiteQuery";
import useMaxStockForWorksiteQuery from "../hooks/useMaxStockForWorksiteQuery";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import CollapsibleTable from "../components/CollapsibleTable";
import SortingTable from "../components/SortingTable";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { useEffect } from "react";

const StockContainer = ({ worksite }) => {
    const worksiteId = worksite.worksite_id;
    const { stocks, isStocksLoading, isStocksError, stocksError } =
        useStocksForWorksiteQuery(worksiteId);
    const { maxStocks, isMaxStocksLoading, isMaxStocksError, maxStocksError } =
        useMaxStockForWorksiteQuery(worksiteId);

    const getUniqueCategories = (stockList) => {
        const uniqueCategories = {};

        stockList.forEach((stock) => {
            const categoryId = stock.product.category.category_id;
            if (!uniqueCategories[categoryId]) {
                uniqueCategories[categoryId] = stock.product.category;
            }
        });

        return Object.values(uniqueCategories);
    };

    useEffect(() => {
        console.log(stocks);
    }, [stocks]);

    if (isStocksLoading || isMaxStocksLoading) {
        return <Loading />;
    }

    if (stocksError) {
        return <ErrorMessage message={stocksError.message} />;
    }

    if (maxStocksError) {
        return <ErrorMessage message={maxStocksError.message} />;
    }

    const uniqueCategories = getUniqueCategories(stocks);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {uniqueCategories.map((category) => (
                <Box m={2} key={category.name} sx={{ paddingBottom: "25px" }}>
                    <Typography variant="h6" component="h2">
                        {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                    </Typography>
                    <SortingTable
                        category={category}
                        stocks={stocks.filter(
                            (stock) =>
                                stock.product.category.category_id ===
                                category.category_id,
                        )}
                        maxStocks={maxStocks}
                    />
                </Box>
            ))}
            <Button
                m={2}
                component={Link}
                to="/request/return/"
                variant="contained"
                color="primary"
            >
                Nouveau Retour
            </Button>
        </Box>
    );
};

export default StockContainer;
