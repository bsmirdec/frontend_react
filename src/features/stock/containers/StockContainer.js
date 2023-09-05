import useStocksForWorksiteQuery from "../hooks/useStocksForWorksiteQuery";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import CollapsibleTable from "../components/CollapsibleTable";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";

const StockContainer = ({ worksite }) => {
    const worksiteId = worksite.worksite_id;
    const {
        data: stocks,
        isLoading,
        error,
    } = useStocksForWorksiteQuery(worksiteId);

    const getUniqueCategories = (stockList) => {
        const uniqueCategories = new Set();
        stockList.forEach((stock) => {
            uniqueCategories.add(stock.product.category);
        });
        return Array.from(uniqueCategories);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
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
                    <CollapsibleTable
                        category={category}
                        stocks={stocks.filter(
                            (stock) =>
                                stock.product.category.category_id ===
                                category.category_id,
                        )}
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
