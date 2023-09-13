import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import useAuth from "../../features/auth/hooks/useAuth";
import { useBusiness } from "../../features/permissions/context/BusinessContext";
import { useCart } from "../../features/products/context/CartContext";
import Logo from "./headercomponents/Logo";
import MobilLogo from "./headercomponents/MobilLogo";
import HomeLink from "./headercomponents/HomeLink";
import MobilHomeLink from "./headercomponents/MobliHomeLink";
import MobilNavMenu from "./headercomponents/MobilNavMenu";
import NavMenu from "./headercomponents/NavMenu";
import CartIcon from "./headercomponents/CartIcon";
import NotificationsMenu from "./headercomponents/NotificationsMenu";

// Material UI
import { AppBar, Toolbar, Container } from "@mui/material";
import UserMenu from "./headercomponents/UserMenu";

const pages = [
    { address: "worksite", name: "Chantier" },
    { address: "product", name: "Catalogue" },
    { address: "request", name: "Commande" },
    { address: "employee", name: "Management" },
];

function Header() {
    const { auth } = useAuth();
    const { businessData } = useBusiness();
    const { cartDrawerOpen } = useCart();
    const [pageList, setPageList] = useState(pages);
    const theme = useTheme();

    useEffect(() => {
        if (businessData.permissions) {
            const allowedPages = pages.filter((page) => {
                const requiredPermission = `${page.address}_view_list`;
                return businessData.permissions[requiredPermission];
            });
            setPageList(allowedPages);
        }
    }, [businessData]);

    return (
        <AppBar
            position="sticky"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            style={{ backgroundColor: theme.palette.primary.light }}
        >
            <Container maxWidth="xl">
                {auth.userId && (
                    <Toolbar disableGutters>
                        <Logo />
                        <HomeLink theme={theme} />
                        <MobilNavMenu pageList={pageList} />
                        <MobilLogo />
                        <MobilHomeLink theme={theme} />
                        <NavMenu pageList={pageList} />
                        <CartIcon />
                        <NotificationsMenu />
                        <UserMenu />
                    </Toolbar>
                )}
            </Container>
        </AppBar>
    );
}
export default Header;
