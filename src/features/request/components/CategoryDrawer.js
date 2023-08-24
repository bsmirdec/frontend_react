import React, { useEffect, useState } from "react";
import useCategoriesListQuery from "../hooks/useCategoriesListQuery";
import useTypesListQuery from "../hooks/useTypesListQuery";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Loading from "../../../components/layout/Loading";
import {
    Box,
    Drawer,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    Collapse,
    Toolbar,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Hardware from "@mui/icons-material/Hardware";

const CategoryDrawer = ({
    open,
    onClose,
    variant,
    selectedType,
    setSelectedType,
}) => {
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useCategoriesListQuery();
    const { data: types, isLoadingTypes, isErrorTypes } = useTypesListQuery();
    const [openCategories, setOpenCategories] = useState([]);

    const handleCategoryToggle = (category_id) => {
        setOpenCategories((prevOpenCategories) => {
            if (prevOpenCategories.includes(category_id)) {
                return prevOpenCategories.filter((id) => id !== category_id);
            } else {
                return [...prevOpenCategories, category_id];
            }
        });
    };

    const handleTypeClick = (type_id) => {
        setSelectedType(type_id);
    };

    const drawerWidth = 240;

    if (isLoadingCategories || isLoadingTypes) {
        return <Loading />;
    }

    if (isErrorCategories || isErrorTypes) {
        return (
            <ErrorMessage
                message={isErrorCategories.message || isErrorTypes.message}
            />
        );
    }

    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem>
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            Catégories & Types
                        </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <InputBase
                            placeholder="Rechercher..."
                            startAdornment={<SearchIcon />}
                            sx={{ ml: 2, flex: 1 }}
                        />
                    </ListItem>
                    <Divider />
                    {selectedType && (
                        <ListItemButton>
                            <ListItemText
                                primary="Réinitialiser"
                                onClick={() => setSelectedType(null)}
                            />
                        </ListItemButton>
                    )}
                    {categories.map((category) => (
                        <Box key={category.category_id}>
                            <ListItemButton
                                onClick={() =>
                                    handleCategoryToggle(category.category_id)
                                }
                            >
                                <ListItemIcon>
                                    <Hardware />
                                </ListItemIcon>
                                <ListItemText primary={category.name} />
                                {openCategories.includes(
                                    category.category_id,
                                ) && <ExpandLess />}
                                {!openCategories.includes(
                                    category.category_id,
                                ) && <ExpandMore />}
                            </ListItemButton>

                            <Collapse
                                timeout="auto"
                                unmountOnExit
                                in={openCategories.includes(
                                    category.category_id,
                                )}
                            >
                                <List component="div" disablePadding>
                                    {types &&
                                        types
                                            .filter(
                                                (type) =>
                                                    type.category ===
                                                    category.category_id,
                                            )
                                            .map((filteredType) => (
                                                <ListItemButton
                                                    key={filteredType.type_id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() =>
                                                        handleTypeClick(
                                                            filteredType.type_id,
                                                        )
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={
                                                            filteredType.name
                                                        }
                                                    />
                                                </ListItemButton>
                                            ))}
                                </List>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default CategoryDrawer;
